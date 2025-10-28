"use client";

import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface PodDetail {
  name: string;
  status: string;
  restarts: number;
  age: string;
  ready?: boolean;
}

interface ClusterMetrics {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  pods: {
    total: number;
    running: number;
    pending: number;
    failed: number;
    details?: PodDetail[];
  };
  namespace?: string;
}

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<ClusterMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Fetch metrics every 10 seconds
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch metrics');

        const data = await response.json();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // Refresh every 10s

    return () => clearInterval(interval);
  }, []);

  // Extract service information from pod details (must be before early returns)
  const services = React.useMemo(() => {
    if (!metrics?.pods.details) return null;

    const serviceCounts: Record<string, { total: number; running: number }> = {};

    metrics.pods.details.forEach(pod => {
      let serviceName = 'unknown';

      // Extract service name from pod name (order matters - check specific names first)
      if (pod.name.includes('runner')) {
        serviceName = 'actions runner';
      } else if (pod.name.includes('nextjs')) {
        serviceName = 'nextjs';
      } else if (pod.name.includes('postgres')) {
        serviceName = 'postgres';
      } else if (pod.name.includes('redis')) {
        serviceName = 'redis';
      }

      if (!serviceCounts[serviceName]) {
        serviceCounts[serviceName] = { total: 0, running: 0 };
      }

      serviceCounts[serviceName].total++;
      if (pod.status === 'Running' && pod.ready !== false) {
        serviceCounts[serviceName].running++;
      }
    });

    return serviceCounts;
  }, [metrics?.pods.details]);

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Activity className="w-5 h-5 animate-pulse" aria-hidden="true" />
          <span className="font-mono text-sm">Loading cluster metrics...</span>
        </div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="bg-gray-900 border border-red-900/50 rounded-xl p-6">
        <div className="flex items-center gap-2 text-red-400">
          <Activity className="w-5 h-5" aria-hidden="true" />
          <span className="font-mono text-sm">Cluster offline: {error}</span>
        </div>
      </div>
    );
  }

  const statusColor = {
    healthy: 'text-green-400',
    degraded: 'text-yellow-400',
    unhealthy: 'text-red-400'
  }[metrics.status];

  const statusDot = {
    healthy: 'bg-green-400',
    degraded: 'bg-yellow-400',
    unhealthy: 'bg-red-400'
  }[metrics.status];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusDot} animate-pulse`} aria-hidden="true" />
          <span className={`text-sm font-semibold ${statusColor}`}>
            CLUSTER: {metrics.status.toUpperCase()}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {currentTime.toLocaleTimeString('en-US', {
            timeZone: 'UTC',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })} UTC
        </span>
      </div>

      {/* Content - Namespace, Services, Pods */}
      <div className="px-6 py-4 space-y-3">
        {/* Namespace */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Namespace:</span>
          <span className="text-purple-400">{metrics.namespace || 'portfolio'}</span>
        </div>

        {/* Services Cards */}
        {services && Object.keys(services).length > 0 && (
          <div className="py-1">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Services</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(services).map(([name, counts]) => {
                const isHealthy = counts.running === counts.total;
                const hoverGlow = isHealthy
                  ? 'hover:border-green-400/30 hover:bg-green-400/5'
                  : 'hover:border-yellow-400/30 hover:bg-yellow-400/5';
                const textStatusColor = isHealthy ? 'text-green-400' : 'text-yellow-400';
                const displayName = name.charAt(0).toUpperCase() + name.slice(1);

                return (
                  <div
                    key={name}
                    className={`flex-1 min-w-[120px] sm:min-w-[140px] border border-gray-700 bg-gray-800/30 rounded p-2 text-center transition-all duration-300 ease-in-out ${hoverGlow} hover:scale-[1.02]`}
                  >
                    <div className="text-xs text-gray-400 mb-1">{displayName}</div>
                    <div className={`text-sm font-semibold ${textStatusColor}`}>
                      {counts.running}/{counts.total} {isHealthy ? '●' : '◐'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pods Summary */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Pods Running:</span>
          <span className="text-green-400">{metrics.pods.running}/{metrics.pods.total}</span>
        </div>
        {metrics.pods.pending > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Pods Pending:</span>
            <span className="text-yellow-400">{metrics.pods.pending}</span>
          </div>
        )}
        {metrics.pods.failed > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Pods Failed:</span>
            <span className="text-red-400">{metrics.pods.failed}</span>
          </div>
        )}
      </div>
    </div>
  );
}
