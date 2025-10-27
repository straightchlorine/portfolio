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
 * Falls back to mock data if kubectl is not available
 */
async function getClusterMetrics(): Promise<ClusterMetrics> {
  try {
    // Try to execute the K8s metrics script
    const scriptPath = path.join(process.cwd(), 'scripts', 'fetch-k8s-metrics.sh')
    const outputPath = '/tmp/k8s-metrics.json'

    // Check if script exists
    try {
      await fs.access(scriptPath)
    } catch {
      console.log('K8s metrics script not found, using mock data')
      return getMockMetrics()
    }

    // Execute the script with timeout
    const { stdout } = await execAsync(`${scriptPath} portfolio ${outputPath}`, {
      timeout: 10000, // 10 second timeout
    })

    // Read the JSON output
    const metricsData = await fs.readFile(outputPath, 'utf-8')
    const k8sMetrics = JSON.parse(metricsData)

    return k8sMetrics
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
