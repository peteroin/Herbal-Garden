export default function SelectFilter({ label, onChange, options, value }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-forest-700">{label}</span>
      <select
        className="rounded-2xl border border-forest-100 bg-white px-4 py-3 outline-none transition focus:border-forest-400"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
