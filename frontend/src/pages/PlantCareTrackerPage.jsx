import SectionHeading from "../components/ui/SectionHeading";
import PlantCareTracker from "../components/PlantCareTracker";

export default function PlantCareTrackerPage() {
  return (
    <section className="section-shell py-12">
      <SectionHeading
        eyebrow="Plant Care"
        title="Care Tracker"
        copy="Monitor plant health, get care reminders, and track all activities to keep your garden thriving."
      />
      
      <div className="mt-12">
        <PlantCareTracker />
      </div>

      {/* Care Tips Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">💧 Watering Guide</h3>
          <ul className="space-y-3 text-sm text-blue-800">
            <li>
              <strong>Frequency:</strong> Check soil moisture every 2-3 days
            </li>
            <li>
              <strong>Amount:</strong> Water until soil is moist 2-3 inches deep
            </li>
            <li>
              <strong>Best Time:</strong> Early morning or evening to reduce evaporation
            </li>
            <li>
              <strong>Signs of Need:</strong> Soil should feel dry to the touch on top
            </li>
            <li>
              <strong>Drainage:</strong> Ensure pots have drainage holes
            </li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-8 border border-green-200">
          <h3 className="text-xl font-bold text-green-900 mb-4">🌱 Feeding Guide</h3>
          <ul className="space-y-3 text-sm text-green-800">
            <li>
              <strong>Frequency:</strong> Fertilize every 2-4 weeks during growing season
            </li>
            <li>
              <strong>Type:</strong> Balance fertilizer (NPK ratio) for herbs
            </li>
            <li>
              <strong>Organic Option:</strong> Compost tea or worm castings
            </li>
            <li>
              <strong>Application:</strong> Follow product instructions for dilution
            </li>
            <li>
              <strong>Timing:</strong> Fertilize after watering for better absorption
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4">✂️ Pruning & Harvesting</h3>
          <ul className="space-y-3 text-sm text-amber-800">
            <li>
              <strong>Pinch Tops:</strong> Pinch off flower buds to encourage leafy growth
            </li>
            <li>
              <strong>Harvest Method:</strong> Pinch or cut leaves from the top down
            </li>
            <li>
              <strong>Regular Harvest:</strong> Pick regularly to promote bushier growth
            </li>
            <li>
              <strong>Avoid Stripping:</strong> Never remove more than 1/3 of plant at once
            </li>
            <li>
              <strong>Best Time:</strong> Morning after dew dries, before flowers open
            </li>
          </ul>
        </div>

        <div className="bg-stone-100 rounded-lg p-8 border border-stone-300">
          <h3 className="text-xl font-bold text-stone-900 mb-4">🩺 Health Monitoring</h3>
          <ul className="space-y-3 text-sm text-stone-800">
            <li>
              <strong>Check Weekly:</strong> Inspect leaves for pests and disease
            </li>
            <li>
              <strong>Signs of Stress:</strong> Yellowing, wilting, spots, holes
            </li>
            <li>
              <strong>Common Pests:</strong> Aphids, spider mites, whiteflies
            </li>
            <li>
              <strong>Natural Control:</strong> Neem oil, insecticidal soap, companion planting
            </li>
            <li>
              <strong>Air Circulation:</strong> Good airflow prevents fungal issues
            </li>
          </ul>
        </div>
      </div>

      {/* Care Schedule */}
      <div className="mt-16 bg-forest-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-forest-900 mb-6">Weekly Care Schedule</h3>
        <div className="grid md:grid-cols-7 gap-3 text-sm">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
            <div key={day} className="bg-white rounded-lg p-4 border border-forest-200">
              <p className="font-semibold text-forest-900 mb-2">{day}</p>
              <ul className="space-y-1 text-xs text-forest-700">
                {idx % 3 === 0 && <li>✓ Check moisture</li>}
                {idx % 2 === 0 && <li>✓ Inspect health</li>}
                {idx === 3 && <li>✓ Fertilize</li>}
                {idx === 5 && <li>✓ Prune if needed</li>}
                <li>✓ Morning check</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
