type Props = { label: string; value: string; change: number };
export default function StatCard({ label, value, change }: Props) {
  const up = change >= 0;
  return (
    <div className="card animate-fadeInUp">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className={`mt-1 text-sm ${up ? "text-up" : "text-down"}`}>
        {up ? "+" : ""}
        {change.toFixed(2)}%
      </div>
    </div>
  );
}
