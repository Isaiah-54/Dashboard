export default function KPICard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-3xl font-semibold mt-2 tabular-nums">{value}</div>
    </div>
  )
}
