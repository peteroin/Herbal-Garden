import { useEffect, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import InfoItem from "../ui/InfoItem";
import SkeletonLoader from "../ui/SkeletonLoader";
import { primaryButtonClass } from "../../constants/buttonClasses";
import { Link } from "react-router-dom";
import { plantAPI } from "../../lib/api";

export default function ImageSearchSection() {
  console.log("ImageSearchSection Rendering");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [imageResult, setImageResult] = useState("");
  const [matchedLocalPlant, setMatchedLocalPlant] = useState(null);
  const plantIdApiKey = import.meta.env.VITE_PLANT_ID_API_KEY;
  const pixabayApiKey = import.meta.env.VITE_PIXABAY_API_KEY;

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [file]);

  async function handleIdentify() {
    if (!file) {
      setError("Select an image before starting identification.");
      return;
    }

    if (!plantIdApiKey) {
      setError("Add VITE_PLANT_ID_API_KEY to a .env file to enable plant identification.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setMatchedLocalPlant(null);

    try {
      // Step 1: Identification via Plant.id API
      const formData = new FormData();
      formData.append("images", file);

      const response = await fetch("https://api.plant.id/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods,medicinal_properties", {
        method: "POST",
        headers: {
          "Api-Key": plantIdApiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Plant identification failed.");
      }

      const data = await response.json();
      console.log("Plant ID API Raw Data:", data);
      const suggestion = data?.result?.classification?.suggestions?.[0];
      if (!suggestion) {
        throw new Error("No plant match was returned for this image.");
      }

      const identifiedResult = {
        name: suggestion.name,
        commonNames: suggestion.details?.common_names?.join(", ") || "N/A",
        description: suggestion.details?.description?.value || suggestion.details?.description || "No detailed description available.",
        probability: suggestion.probability,
        family: data?.result?.classification?.family?.name ?? data?.result?.classification?.family ?? "Unknown",
        genus: data?.result?.classification?.genus?.name ?? data?.result?.classification?.genus ?? "Unknown",
        species: data?.result?.classification?.species?.name ?? data?.result?.classification?.species ?? "Unknown",
        edible: Array.isArray(suggestion.details?.edible_parts) 
          ? suggestion.details.edible_parts.join(", ") 
          : (data?.result?.details?.edible ? "Yes" : "No"),
        medicinal: Array.isArray(suggestion.details?.medicinal_properties)
          ? suggestion.details.medicinal_properties.join(", ")
          : suggestion.details?.medicinal_properties || data?.result?.details?.medicinal,
        watering: typeof suggestion.details?.watering === 'object'
          ? `Min: ${suggestion.details.watering.min}, Max: ${suggestion.details.watering.max}`
          : suggestion.details?.watering,
        propagation: Array.isArray(suggestion.details?.propagation_methods)
          ? suggestion.details.propagation_methods.join(", ")
          : suggestion.details?.propagation_methods,
        moreInfo: suggestion.details?.url || data?.result?.details?.url,
      };

      setResult(identifiedResult);

      // Step 2: Search for this plant in our local database
      try {
        const localSearchResponse = await plantAPI.getAllPlants();
        const localPlants = localSearchResponse.plants || [];
        const match = localPlants.find(p => 
          p.name?.toLowerCase().includes(suggestion.name.toLowerCase()) || 
          p.scientificName?.toLowerCase().includes(suggestion.name.toLowerCase())
        );
        if (match) {
          setMatchedLocalPlant(match);
        }
      } catch (localErr) {
        console.warn("Could not search local database for matching plant:", localErr);
      }

      // Step 3: Fetch reference image via Pixabay API
      if (pixabayApiKey) {
        const imageResponse = await fetch(
          `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(suggestion.name)}&image_type=photo`,
        );
        const imageData = await imageResponse.json();
        setImageResult(imageData?.hits?.[0]?.webformatURL ?? "");
      } else {
        setImageResult("");
      }
    } catch (caughtError) {
      setError(caughtError.message || "Identification failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-shell py-20">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Header */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-forest-200 rounded-full mb-4">
          <span className="text-2xl">📸</span>
          <span className="text-sm font-semibold text-forest-700">AI Plant Identifier</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4">
          Identify Any Plant <span className="text-green-600">Instantly</span>
        </h2>
        <p className="text-lg text-forest-600">
          Take a photo of any herb or medicinal plant to discover its name, benefits, traditional uses, and cultivation tips powered by AI.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-forest-100">
          <h3 className="text-2xl font-bold text-forest-900 mb-6">📸 Upload Your Plant Photo</h3>
          
          <div className="rounded-2xl border-2 border-dashed border-forest-300 bg-gradient-to-br from-forest-50 to-white p-6">
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <input
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                type="file"
              />
              {previewUrl ? (
                <img 
                  alt="Selected plant preview" 
                  className="h-64 w-full object-cover rounded-xl transition duration-300 group-hover:scale-105 shadow-lg" 
                  src={previewUrl} 
                />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-white border-2 border-dashed border-forest-200 transition group-hover:bg-forest-50">
                  <div className="text-5xl mb-4">📷</div>
                  <p className="text-sm font-bold text-forest-900">Click to upload</p>
                  <p className="text-xs text-forest-500 mt-1">Drag and drop a plant photo here</p>
                  <p className="text-xs text-forest-400 mt-3">PNG, JPG, or WebP (max 5MB)</p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <button 
                className={`w-full ${primaryButtonClass} flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`} 
                onClick={handleIdentify} 
                disabled={loading || !file}
                type="button"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                    </svg>
                    Analyzing Plant...
                  </>
                ) : (
                  <>
                    <span>✨ Identify Plant</span>
                  </>
                )}
              </button>
              {file && (
                <button 
                  onClick={() => {setFile(null); setResult(null); setMatchedLocalPlant(null);}} 
                  className="w-full px-4 py-2 text-sm font-semibold border border-forest-200 text-forest-700 rounded-lg hover:bg-forest-50 transition"
                >
                  Clear
                </button>
              )}
            </div>

            {!plantIdApiKey && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <span className="font-bold">⚠ Note:</span> Plant ID API not configured. Add VITE_PLANT_ID_API_KEY to .env
                </p>
              </div>
            )}
            {error && <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200 text-sm text-red-700 font-medium">{error}</div>}
          </div>

          {/* Example Plants */}
          <div className="mt-8 pt-6 border-t border-forest-100">
            <p className="text-sm font-semibold text-forest-700 mb-4">Try these plants:</p>
            <div className="grid grid-cols-2 gap-3">
              {['Turmeric', 'Ginger', 'Basil', 'Lavender'].map((plant) => (
                <div key={plant} className="p-3 bg-forest-50 rounded-lg border border-forest-100 text-center hover:bg-forest-100 transition cursor-pointer">
                  <p className="text-xs font-semibold text-forest-700">{plant}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-forest-100">
          <h3 className="text-2xl font-bold text-forest-900 mb-6">🔬 Identification Results</h3>
          
          {loading ? (
            <div className="space-y-6">
              <div className="h-8 bg-forest-200 rounded animate-pulse" />
              <div className="h-64 bg-forest-200 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 bg-forest-200 rounded animate-pulse" />
                <div className="h-4 bg-forest-200 rounded animate-pulse w-5/6" />
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Match Info */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-200">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-green-600">AI Identified</p>
                    <h3 className="text-4xl font-bold text-green-900 mt-2">{result.name}</h3>
                  </div>
                  {result.probability && (
                    <div className="bg-white px-4 py-2 rounded-full border-2 border-green-200 shadow-md">
                      <span className="text-sm font-bold text-green-700">
                        {(result.probability * 100).toFixed(0)}% Match
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-green-800 italic">{result.commonNames}</p>
              </div>

              {/* Taxonomy Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-forest-50 rounded-xl border border-forest-100">
                  <p className="text-xs font-bold uppercase text-forest-600 mb-2">Family</p>
                  <p className="font-semibold text-forest-900">{result.family}</p>
                </div>
                <div className="p-4 bg-forest-50 rounded-xl border border-forest-100">
                  <p className="text-xs font-bold uppercase text-forest-600 mb-2">Genus</p>
                  <p className="font-semibold text-forest-900">{result.genus}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-xs font-bold uppercase text-blue-600 mb-2">Description</p>
                <p className="text-sm text-blue-900 leading-relaxed line-clamp-3 hover:line-clamp-none transition cursor-pointer">
                  {result.description}
                </p>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="text-xs font-bold uppercase text-orange-600">Edible Parts</p>
                  <p className="text-sm font-semibold text-orange-900 mt-1">{result.edible || 'N/A'}</p>
                </div>
                <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                  <p className="text-xs font-bold uppercase text-cyan-600">Watering</p>
                  <p className="text-sm font-semibold text-cyan-900 mt-1">{result.watering || 'N/A'}</p>
                </div>
              </div>

              {/* Local Match */}
              {matchedLocalPlant && (
                <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300 flex items-start gap-3">
                  <span className="text-2xl mt-1">✅</span>
                  <div>
                    <p className="font-bold text-green-900">Found in Our Garden!</p>
                    <p className="text-xs text-green-700 mt-1">This plant is in our botanical encyclopedia with verified medicinal data.</p>
                    <Link 
                      to={`/plants/${matchedLocalPlant._id || matchedLocalPlant.id}`}
                      className="mt-2 inline-flex items-center text-sm font-bold text-green-700 hover:text-green-900 transition"
                    >
                      Explore Profile →
                    </Link>
                  </div>
                </div>
              )}

              {/* More Info */}
              {result.moreInfo && (
                <a 
                  className="inline-flex items-center text-sm font-bold text-forest-700 hover:text-forest-900 transition gap-2" 
                  href={result.moreInfo} 
                  rel="noreferrer" 
                  target="_blank"
                >
                  <span>📚 Learn More (External)</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </a>
              )}
            </div>
          ) : (
            <div className="flex  flex-col items-center justify-center h-96 text-center py-12">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-forest-600 font-medium">Upload a plant photo to see identification results</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
