import { NextResponse } from 'next/server'

/**
 * Attempts to gather high‑level stats from public sources.
 * You can override with STATS_JSON_URL env var that returns { accounts, transactions }.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  // External override
  const override = process.env.STATS_JSON_URL
  if (override) {
    try {
      const r = await fetch(override, { next: { revalidate: 60 } })
      if (r.ok) {
        const j = await r.json()
        if (typeof j?.accounts === 'number' && typeof j?.transactions === 'number') {
          return NextResponse.json(j)
        }
      }
    } catch {}
  }

  // TODO: If/when an official Aztec explorer API exposes totals, plug it here.
  // For now, return friendly demo values so you can deploy immediately.
  return NextResponse.json({ accounts: 12345, transactions: 678901 })
}
