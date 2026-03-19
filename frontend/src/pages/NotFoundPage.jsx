import { Link } from "react-router-dom";

export default function NotFoundPage({ message = "The page you requested could not be found." }) {
  return (
    <section className="section-shell py-24">
      <div className="mx-auto max-w-2xl glass-panel p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay-700">Not Found</p>
        <h1 className="mt-4 font-display text-5xl font-semibold text-forest-900">Missing page</h1>
        <p className="mt-4 text-base leading-7 text-forest-700">{message}</p>
        <Link className="mt-8 inline-flex rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white" to="/">
          Return Home
        </Link>
      </div>
    </section>
  );
}
