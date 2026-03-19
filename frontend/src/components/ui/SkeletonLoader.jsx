/**
 * SkeletonLoader - Reusable skeleton loading component
 * Displays a pulsing skeleton placeholder while content is loading
 */

export default function SkeletonLoader({ 
  variant = 'card', // 'card', 'text', 'heading', 'hero', 'list'
  count = 1,
  className = ''
}) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-forest-100 via-forest-50 to-forest-100';

  const variants = {
    heading: `h-8 w-48 rounded-lg ${baseClasses}`,
    text: `h-4 w-full rounded ${baseClasses}`,
    card: (
      <div className={`rounded-[28px] border border-forest-100 bg-white p-6 sm:p-8 shadow-soft ${baseClasses}`}>
        <div className="space-y-4">
          <div className={`h-6 w-32 rounded-lg ${baseClasses}`} />
          <div className={`h-4 w-full rounded ${baseClasses}`} />
          <div className={`h-4 w-full rounded ${baseClasses}`} />
          <div className={`h-4 w-3/4 rounded ${baseClasses}`} />
        </div>
      </div>
    ),
    hero: (
      <div className="rounded-[36px] border border-forest-100 bg-white p-8 space-y-6">
        <div className={`h-12 w-64 rounded-lg ${baseClasses}`} />
        <div className="space-y-3">
          <div className={`h-4 w-full rounded ${baseClasses}`} />
          <div className={`h-4 w-full rounded ${baseClasses}`} />
          <div className={`h-4 w-3/4 rounded ${baseClasses}`} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`h-32 rounded-lg ${baseClasses}`} />
          ))}
        </div>
      </div>
    ),
    list: (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`h-20 rounded-xl ${baseClasses}`} />
        ))}
      </div>
    ),
    gallery: (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`aspect-[4/5] rounded-3xl ${baseClasses}`} />
        ))}
      </div>
    ),
    filter: (
      <div className="h-10 w-full rounded-xl border border-forest-100 bg-white pulse-subtle" />
    ),
    item: (
      <div className={`h-16 w-full rounded-lg ${baseClasses}`} />
    )
  };

  if (variant === 'text' || variant === 'heading') {
    return (
      <div className={`${variants[variant]} ${className}`} />
    );
  }

  if (count === 1) {
    return <div className={className}>{variants[variant] || variants.card}</div>;
  }

  return (
    <div className={className}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="mb-4">
          {variants[variant] || variants.card}
        </div>
      ))}
    </div>
  );
}
