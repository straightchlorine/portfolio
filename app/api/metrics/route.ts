import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PodStatus {
  name: string
  status: string
  restarts: number
  age: string
  ready?: boolean
}

interface ClusterMetrics {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  pods: {
    total: number
    running: number
    pending: number
    failed: number
    details: PodStatus[]
  }
  namespace?: string
}

/**
 * Attempt to fetch real K8s metrics from the cluster
 * Falls back to mock data if kubectl is not available or times out
 */
async function getClusterMetrics(): Promise<ClusterMetrics> {
  try {
    // Quick check: see if we're in a Kubernetes cluster by checking for service account token
    const saTokenPath = '/var/run/secrets/kubernetes.io/serviceaccount/token'
    try {
      await fs.access(saTokenPath)
    } catch {
      console.log('Not running in Kubernetes cluster, using mock data')
      return getMockMetrics()
    }

    // Try to execute the K8s metrics script
    const scriptPath = path.join(process.cwd(), 'scripts', 'fetch-k8s-metrics.sh')
    const outputPath = `/tmp/k8s-metrics-${Date.now()}.json`

    // Check if script exists
    try {
      await fs.access(scriptPath)
    } catch {
      console.log('K8s metrics script not found, using mock data')
      return getMockMetrics()
    }

    // Execute the script with aggressive timeout (5 seconds) to fail fast
    // and not block the API endpoint for too long
    try {
      await execAsync(`timeout 5 ${scriptPath} portfolio ${outputPath}`, {
        timeout: 6000, // 6 second timeout (includes command execution overhead)
      })
    } catch (error) {
      console.log('K8s metrics script timed out or failed, using mock data')
      return getMockMetrics()
    }

    // Read the JSON output
    try {
      const metricsData = await fs.readFile(outputPath, 'utf-8')
      const k8sMetrics = JSON.parse(metricsData)

      // Clean up temp file
      fs.unlink(outputPath).catch(() => {})

      return k8sMetrics
    } catch (error) {
      console.log('Failed to parse K8s metrics, using mock data')
      return getMockMetrics()
    }
  } catch (error) {
    console.error('Failed to fetch K8s metrics:', error)
    // Fall back to mock data
    return getMockMetrics()
  }
}

/**
 * Mock metrics for when K8s is not accessible
 */
function getMockMetrics(): ClusterMetrics {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    pods: {
      total: 4,
      running: 4,
      pending: 0,
      failed: 0,
      details: [
        {
          name: 'portfolio-nextjs-5c67f78f6d-kdwsd',
          status: 'Running',
          restarts: 0,
          age: '4d4h',
          ready: true,
        },
        {
          name: 'portfolio-nextjs-5c67f78f6d-n2xpx',
          status: 'Running',
          restarts: 0,
          age: '4d4h',
          ready: true,
        },
        {
          name: 'postgres-0',
          status: 'Running',
          restarts: 0,
          age: '4d21h',
          ready: true,
        },
        {
          name: 'redis-7c65f475fc-52hrz',
          status: 'Running',
          restarts: 0,
          age: '4d21h',
          ready: true,
        },
      ],
    },
    namespace: 'portfolio',
  }
}

export async function GET() {
  try {
    const metrics = await getClusterMetrics()

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}
