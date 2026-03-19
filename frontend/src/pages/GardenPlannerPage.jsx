import SectionHeading from "../components/ui/SectionHeading";
import GardenPlanner from "../components/GardenPlanner";

export default function GardenPlannerPage() {
  return (
    <section className="section-shell py-12">
      <SectionHeading
        eyebrow="Garden Design"
        title="Garden Planner"
        copy="Design and plan your herbal garden layout with expert recommendations based on sunlight, soil, and seasons."
      />
      
      <div className="mt-12">
        <GardenPlanner />
      </div>

      {/* Tips Section */}
      <div className="mt-16 bg-forest-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-forest-900 mb-6">Garden Planning Tips</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-forest-900 mb-3">Consider Sunlight</h4>
            <ul className="space-y-2 text-sm text-forest-700">
              <li><strong>Full Sun (6-8 hrs):</strong> Basil, oregano, thyme, rosemary</li>
              <li><strong>Partial Shade (3-6 hrs):</strong> Mint, parsley, chives, sage</li>
              <li><strong>Full Shade (&lt;3 hrs):</strong> Sorrel, lemon balm, sweet woodruff</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-forest-900 mb-3">Seasonal Planning</h4>
            <ul className="space-y-2 text-sm text-forest-700">
              <li><strong>Spring:</strong> Plant cool-season herbs before heat</li>
              <li><strong>Summer:</strong> Focus on heat-loving varieties</li>
              <li><strong>Fall:</strong> Plant cool crops again for harvest</li>
              <li><strong>Winter:</strong> Cold-hardy herbs and soil prep</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold text-forest-900 mb-3">Design Features</h4>
          <p className="text-sm text-forest-700 mb-4">
            Add useful features to your garden design to make it more functional and beautiful:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded p-3">
              <p className="font-medium text-forest-900">🪑 Seating Bench</p>
              <p className="text-xs text-forest-600">Create a relaxing space to enjoy your garden</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-medium text-forest-900">💧 Water Source</p>
              <p className="text-xs text-forest-600">Make watering convenient and efficient</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-medium text-forest-900">🛤️ Walkway Path</p>
              <p className="text-xs text-forest-600">Easy access to all parts of your garden</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="font-medium text-forest-900">♻️ Compost Area</p>
              <p className="text-xs text-forest-600">Sustainable nutrient source for plants</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
