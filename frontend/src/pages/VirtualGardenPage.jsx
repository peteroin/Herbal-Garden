import SectionHeading from "../components/ui/SectionHeading";
import VirtualGarden from "../components/VirtualGarden";

export default function VirtualGardenPage() {
  return (
    <section className="section-shell py-12">
      <SectionHeading
        eyebrow="Virtual Gardening"
        title="My Herbal Garden"
        copy="Plant, grow, and harvest virtual medicinal herbs. Monitor your plants' health and track their growth stages."
      />
      
      <div className="mt-12">
        <VirtualGarden />
      </div>

      {/* Tips Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="bg-forest-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-forest-900 mb-3">Growth Stages</h3>
          <ul className="space-y-2 text-sm text-forest-700">
            <li className="flex gap-2">
              <span className="font-bold">🌱</span> <span><strong>Seedling:</strong> Just planted</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">🌿</span> <span><strong>Growing:</strong> Developing</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">🍀</span> <span><strong>Mature:</strong> Fully grown</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">🌾</span> <span><strong>Ready:</strong> Harvest time</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Watering Tips</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• Water regularly to keep plants healthy</li>
            <li>• Check water level in moisture bar</li>
            <li>• Most herbs need consistent moisture</li>
            <li>• Avoid overwatering</li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Harvesting</h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li>• Plants ready to harvest get highlighted</li>
            <li>• Harvest and replant to continue growing</li>
            <li>• Track your total harvests</li>
            <li>• Each plant can be harvested once</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
