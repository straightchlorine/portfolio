#!/bin/bash

# Kubernetes Metrics Fetcher
# This script pulls real-time metrics from the K8s cluster
# Usage: ./fetch-k8s-metrics.sh [namespace]

set -euo pipefail

NAMESPACE="${1:-portfolio}"
OUTPUT_FILE="${2:-/tmp/k8s-metrics.json}"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo '{"error": "kubectl not found", "status": "unavailable"}' > "$OUTPUT_FILE"
    exit 1
fi

# Check if we can connect to cluster (using a faster command)
if ! kubectl get namespaces &> /dev/null; then
    echo '{"error": "Cannot connect to cluster", "status": "unavailable"}' > "$OUTPUT_FILE"
    exit 1
fi

# Get pod information
get_pods() {
    kubectl get pods -n "$NAMESPACE" -o json | jq -r '
        .items | map({
            name: .metadata.name,
            status: .status.phase,
            restarts: (if .status.containerStatuses then ([.status.containerStatuses[].restartCount] | add) else 0 end),
            age: .metadata.creationTimestamp,
            ready: (if .status.containerStatuses then (.status.containerStatuses | map(select(.ready == true)) | length) else 0 end),
            total: (if .status.containerStatuses then (.status.containerStatuses | length) else 0 end)
        })
    '
}

# Get deployment information
get_deployments() {
    kubectl get deployments -n "$NAMESPACE" -o json | jq -r '
        .items | map({
            name: .metadata.name,
            replicas: (if .status.replicas then .status.replicas else 0 end),
            ready: (if .status.readyReplicas then .status.readyReplicas else 0 end),
            available: (if .status.availableReplicas then .status.availableReplicas else 0 end),
            updated: (if .status.updatedReplicas then .status.updatedReplicas else 0 end)
        })
    '
}

# Get service information
get_services() {
    kubectl get services -n "$NAMESPACE" -o json | jq -r '
        .items | map({
            name: .metadata.name,
            type: .spec.type,
            clusterIP: .spec.clusterIP,
            ports: [.spec.ports[]? | {port: .port, protocol: .protocol}]
        })
    '
}

# Get namespace resource usage (requires metrics-server)
get_resource_usage() {
    if kubectl top nodes &> /dev/null; then
        kubectl top pods -n "$NAMESPACE" --no-headers 2>/dev/null | awk '
            BEGIN { cpu=0; mem=0; count=0 }
            {
                # Extract numeric values from CPU (e.g., "45m" -> 45)
                gsub(/m/, "", $2)
                cpu += $2

                # Extract numeric values from Memory (e.g., "128Mi" -> 128)
                gsub(/Mi|Gi/, "", $3)
                mem += $3
                count++
            }
            END {
                if (count > 0) {
                    printf "{\"avgCpu\": \"%dm\", \"totalMem\": \"%dMi\", \"podCount\": %d}", cpu/count, mem, count
                } else {
                    print "{\"avgCpu\": \"0m\", \"totalMem\": \"0Mi\", \"podCount\": 0}"
                }
            }
        '
    else
        echo '{"avgCpu": "N/A", "totalMem": "N/A", "podCount": 0}'
    fi
}

# Calculate uptime from oldest pod
calculate_uptime() {
    kubectl get pods -n "$NAMESPACE" -o json | jq -r '
        [.items[].metadata.creationTimestamp] | sort | .[0]
    ' | xargs -I {} date -d {} +%s
}

# Get cluster events (last 10 warnings/errors)
get_recent_events() {
    kubectl get events -n "$NAMESPACE" --sort-by='.lastTimestamp' | tail -10 | \
    awk '{printf "%s %s\\n", $4, $NF}' | jq -R -s 'split("\n") | map(select(length > 0))'
}

# Format age string (e.g., "4d21h")
format_age() {
    local timestamp=$1
    local now=$(date +%s)
    local age=$((now - $(date -d "$timestamp" +%s)))
    local days=$((age / 86400))
    local hours=$(( (age % 86400) / 3600 ))

    if [ "$days" -gt 0 ]; then
        echo "${days}d${hours}h"
    else
        local minutes=$(( (age % 3600) / 60 ))
        echo "${hours}h${minutes}m"
    fi
}

# Main execution
main() {
    # Fetch pod data
    pods=$(get_pods)

    # Count pod statuses
    total_pods=$(echo "$pods" | jq '. | length')
    running_pods=$(echo "$pods" | jq '[.[] | select(.status == "Running")] | length')
    pending_pods=$(echo "$pods" | jq '[.[] | select(.status == "Pending")] | length')
    failed_pods=$(echo "$pods" | jq '[.[] | select(.status == "Failed")] | length')

    # Get current timestamp for age calculation
    now=$(date +%s)

    # Build pod details with human-readable ages using a temp file
    temp_pods_file="/tmp/pods_details_$$.json"
    echo "$pods" | jq -c '.[]' | while IFS= read -r pod; do
        pod_name=$(echo "$pod" | jq -r '.name')
        pod_status=$(echo "$pod" | jq -r '.status')
        pod_restarts=$(echo "$pod" | jq -r '.restarts')
        pod_age_ts=$(echo "$pod" | jq -r '.age')
        pod_ready=$(echo "$pod" | jq -r '.ready')
        pod_total=$(echo "$pod" | jq -r '.total')

        # Calculate human-readable age
        if [ "$pod_age_ts" != "null" ] && [ -n "$pod_age_ts" ]; then
            age_seconds=$((now - $(date -d "$pod_age_ts" +%s 2>/dev/null || echo $now)))
            days=$((age_seconds / 86400))
            hours=$(( (age_seconds % 86400) / 3600 ))

            if [ "$days" -gt 0 ]; then
                age_str="${days}d${hours}h"
            else
                minutes=$(( (age_seconds % 3600) / 60 ))
                if [ "$hours" -gt 0 ]; then
                    age_str="${hours}h${minutes}m"
                else
                    age_str="${minutes}m"
                fi
            fi
        else
            age_str="unknown"
        fi

        # Determine if pod is ready
        if [ "$pod_ready" -eq "$pod_total" ] && [ "$pod_total" -gt 0 ]; then
            ready_bool="true"
        else
            ready_bool="false"
        fi

        # Write pod JSON to temp file
        echo "{\"name\":\"${pod_name}\",\"status\":\"${pod_status}\",\"restarts\":${pod_restarts},\"age\":\"${age_str}\",\"ready\":${ready_bool}}"
    done > "$temp_pods_file"

    # Convert temp file to JSON array
    pods_final=$(cat "$temp_pods_file" | jq -s '.')
    rm -f "$temp_pods_file"

    # Determine cluster status
    if [ "$failed_pods" -gt 0 ]; then
        status="unhealthy"
    elif [ "$pending_pods" -gt 0 ] || [ "$running_pods" -lt "$total_pods" ]; then
        status="degraded"
    else
        status="healthy"
    fi

    # Build simplified JSON output
    jq -n \
        --arg status "$status" \
        --arg timestamp "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
        --argjson total "$total_pods" \
        --argjson running "$running_pods" \
        --argjson pending "$pending_pods" \
        --argjson failed "$failed_pods" \
        --argjson details "$pods_final" \
        --arg namespace "$NAMESPACE" \
        '{
            status: $status,
            timestamp: $timestamp,
            pods: {
                total: $total,
                running: $running,
                pending: $pending,
                failed: $failed,
                details: $details
            },
            namespace: $namespace
        }' > "$OUTPUT_FILE"

    # Output to stdout as well
    cat "$OUTPUT_FILE"
}

main "$@"
