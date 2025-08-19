'use client'
import { useEffect, useState } from 'react'
import KPICard from '@/components/KPICard'
import dynamic from 'next/dynamic'
import RegionLegend from '@/components/RegionLegend'

const NodeMap = dynamic(() => import('@/components/NodeMap'), { ssr: false })

type Stats = { accounts: number; transactions: number }

type NodePoint = { lat: number; lng: number; city?: string; country?: string; region?: string }

export default function Page() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [nodes, setNodes] = useState<NodePoint[]>([])
  const [meta, setMeta] = useState<{ demo?: boolean; approximate?: boolean }>({})

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
    fetch('/api/nodes')
      .then(r => r.json())
      .then(({ nodes, demo, approximate }) => {
        setNodes(nodes || [])
        setMeta({ demo, approximate })
      })
      .catch(() => {})
  }, [])

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">Aztec Nodes & Network Stats</h1>
          <a
            href="https://aztec.nethermind.io/"
            target="_blank"
            rel="noreferrer"
            className="text-sm opacity-80 hover:opacity-100 underline"
          >
            Data refs
          </a>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <KPICard label="Accounts" value={stats?.accounts ?? '—'} />
          <KPICard label="Total Transactions" value={stats?.transactions ?? '—'} />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Where nodes are running</h2>
            {meta.demo && (
              <span className="text-xs rounded-full bg-yellow-500/10 text-yellow-400 px-2 py-1">demo data</span>
            )}
            {meta.approximate && (
              <span className="text-xs rounded-full bg-blue-500/10 text-blue-400 px-2 py-1">approximate</span>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-4">
              <NodeMap points={nodes} />
            </div>
            <div className="lg:col-span-1">
              <RegionLegend points={nodes} />
            </div>
          </div>
        </section>

        <footer className="pt-6 border-t border-white/10 text-xs opacity-70">
          Built with Next.js on Vercel. This dashboard respects privacy: no IPs stored; regional view is aggregated/opt‑in.
        </footer>
      </div>
    </main>
  )
}
