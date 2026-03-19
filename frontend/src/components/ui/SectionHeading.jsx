export default function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mb-10 flex flex-col gap-4">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-700">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}
