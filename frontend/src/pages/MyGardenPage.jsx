import { Link } from 'react-router-dom';
import { Sprout, Pencil, Heart, Leaf, Zap } from 'lucide-react';

export default function MyGardenPage() {
  const features = [
    {
      title: 'Virtual Garden Simulator',
      description: 'Plant and grow virtual herbs. Water them, watch them grow through stages, and harvest when ready.',
      icon: Sprout,
      link: '/virtual-garden',
      color: 'from-green-400 to-forest-600',
      iconColor: 'text-green-600',
      accent: 'bg-green-50'
    },
    {
      title: 'Garden Planner',
      description: 'Design your ideal herbal garden layout. Plan spacing, sunlight, soil type, and garden features.',
      icon: Pencil,
      link: '/garden-planner',
      color: 'from-amber-400 to-orange-600',
      iconColor: 'text-amber-600',
      accent: 'bg-amber-50'
    },
    {
      title: 'Plant Care Tracker',
      description: 'Track watering schedules, care activities, and plant health. Get smart care tips and reminders.',
      icon: Heart,
      link: '/care-tracker',
      color: 'from-rose-400 to-red-600',
      iconColor: 'text-rose-600',
      accent: 'bg-rose-50'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-forest-50 via-white to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      
      <div className="section-shell space-y-20 py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-forest-200 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Leaf className="w-4 h-4 text-forest-600 animate-pulse" />
            <span className="text-sm font-semibold text-forest-700">Your Personal Garden Hub</span>
            <Leaf className="w-4 h-4 text-forest-600 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-forest-900 leading-tight">
            My Herbal<br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              Garden
            </span>
          </h1>
          <p className="text-xl text-forest-600 leading-relaxed max-w-2xl mx-auto">
            Explore three powerful tools to cultivate your knowledge of medicinal plants through interactive simulation, strategic planning, and health tracking.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="group relative h-full"
              >
                {/* Card wrapper with gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className={`relative h-full overflow-hidden rounded-2xl bg-white border border-forest-100 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-forest-300 group-hover:-translate-y-2`}>
                  {/* Background image with overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <img 
                      src={index === 0 ? '/images/plant1.jpg' : index === 1 ? '/images/plant1.jpg' : '/images/plant2.jpg'}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${feature.color}`} />
                  
                  {/* Background accent */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-5 rounded-full -mr-20 -mt-20 group-hover:opacity-15 transition-all duration-500`} />

                  {/* Card content */}
                  <div className="relative p-8 space-y-6 h-full flex flex-col">
                    {/* Icon with glow effect */}
                    <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-50 blur-md`} />
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 space-y-3">
                      <h2 className="text-2xl font-bold text-forest-900 group-hover:text-forest-950 transition">
                        {feature.title}
                      </h2>
                      <p className="text-sm text-forest-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* CTA with arrow */}
                    <div className="flex items-center gap-2 text-forest-700 group-hover:text-forest-900 font-semibold text-sm transition">
                      <span>Explore Now</span>
                      <Zap className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 rotate-45" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Getting Started Section */}
        <div className="relative mt-20">
          {/* Section divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-forest-200" />
            <h3 className="text-3xl font-bold text-forest-900 whitespace-nowrap">Getting Started</h3>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-forest-200" />
          </div>

          {/* Tips grid with cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🌱',
                step: 'Step 1',
                title: 'Plant First',
                description: 'Start with the Virtual Garden to plant and grow your first herbs. Learn how plants develop from seed to harvest.',
                color: 'from-green-500 to-emerald-600',
                image: '/images/plant1.jpg'
              },
              {
                emoji: '📐',
                step: 'Step 2',
                title: 'Plan Ahead',
                description: 'Design your garden layout with the Planner tool. Maximize space with companion planting and sunlight optimization.',
                color: 'from-amber-500 to-orange-600',
                image: '/images/plant1.jpg'
              },
              {
                emoji: '💚',
                step: 'Step 3',
                title: 'Care Consistently',
                description: 'Track plant health with the Care Tracker. Get reminders, log activities, and monitor plant development.',
                color: 'from-rose-500 to-red-600',
                image: '/images/plant2.jpg'
              }
            ].map((tip, idx) => (
              <div key={idx} className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br rounded-2xl from-white/50 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full p-8 rounded-2xl bg-white border border-forest-100 hover:border-forest-200 shadow-md hover:shadow-lg transition-all duration-300 space-y-5">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl">
                    <img 
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Step indicator */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className={`text-4xl ${tip.emoji}`} />
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${tip.color} text-white`}>
                      {tip.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 relative z-10">
                    <h4 className="text-xl font-bold text-forest-900">{tip.title}</h4>
                    <p className="text-sm text-forest-600 leading-relaxed">{tip.description}</p>
                  </div>

                  {/* Bottom accent */}
                  <div className={`h-1 w-12 bg-gradient-to-r ${tip.color} rounded-full group-hover:w-24 transition-all duration-300`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspirational Footer */}
        <div className="mt-20 p-12 rounded-3xl bg-gradient-to-r from-forest-900 to-emerald-900 border border-forest-700 text-white relative overflow-hidden group">
          <img 
            src="/images/plant2.jpg"
            alt="Garden background"
            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-900/80 via-forest-900/70 to-emerald-900/80" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto">
            <p className="text-lg font-medium text-green-100">
              Expert Tip
            </p>
            <p className="text-2xl md:text-3xl font-bold leading-relaxed">
              Understanding medicinal plants through hands-on learning transforms knowledge into practice. Start your journey today.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
