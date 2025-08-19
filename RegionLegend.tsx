import { useMemo } from 'react'

const BUCKETS = ['Africa','Asia','Europe','North America','South America','Oceania']

export default function RegionLegend({ points }: { points: { region?: string }[] }) {
  const counts = useMemo(() => {
    const out: Record<string, number> = {}
    for (const p of points) {
      const r = p.region ?? 'Unspecified'
      out[r] = (out[r] || 0) + 1
    }
    return out
  }, [points])

  return (
    <aside className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
      <div className="text-sm font-medium">Regional distribution</div>
      <ul className="space-y-1 text-sm">
        {BUCKETS.map(r => (
          <li key={r} className="flex justify-between opacity-90">
            <span>{r}</span>
            <span className="tabular-nums">{counts[r] ?? 0}</span>
          </li>
        ))}
        {'Unspecified' in counts && (
          <li className="flex justify-between opacity-70">
            <span>Unspecified</span>
            <span className="tabular-nums">{counts['Unspecified']}</span>
          </li>
        )}
      </ul>
      <p className="text-xs opacity-60 pt-2">Approximate: based on region centroids or demo data.</p>
    </aside>
  )
}
