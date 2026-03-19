export default function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <p className="text-xs uppercase tracking-[0.25em] text-forest-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-forest-900">{value}</p>
    </div>
  );
}
