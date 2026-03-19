// Seed data for plants - based on frontend siteData
const plantsSeedData = [
  {
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    commonNames: ["Purple Coneflower"],
    description: "A North American herb with pink-purple flowers, used to support immune resilience and shorten seasonal illnesses.",
    uses: [
      { use: "Immune support", description: "Enhances natural immunity" },
      { use: "Cold relief", description: "May help shorten duration of colds" }
    ],
    region: "North America",
    plantType: "Herbaceous perennial",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Immune system support", "Anti-inflammatory", "Antioxidant"],
    cautions: ["May cause allergic reactions in sensitive individuals"],
    tags: ["Immune Boosting", "Cold Relief"],
    image: "/images/Echinacea.jpg",
    cultivationNotes: "Prefers well-drained soil and full sun"
  },
  {
    name: "Elderberry",
    scientificName: "Sambucus nigra",
    commonNames: ["Black elderberry", "European elder"],
    description: "A deciduous shrub with dark berries valued for antioxidant support and recovery from colds and flu.",
    uses: [
      { use: "Immune support", description: "High in vitamin C and antioxidants" },
      { use: "Inflammation support", description: "Contains anti-inflammatory compounds" }
    ],
    region: "Europe",
    plantType: "Deciduous shrub",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Immune enhancement", "Antioxidant rich", "Flu relief"],
    cautions: ["Raw berries should not be consumed; cook or use preparations"],
    tags: ["Antioxidant", "Flu Relief"],
    image: "/images/elderberry.jpg",
    cultivationNotes: "Thrives in moist, well-drained soil"
  },
  {
    name: "Astragalus",
    scientificName: "Astragalus membranaceus",
    commonNames: ["Milkvetch", "Huang qi"],
    description: "A leguminous herb with deep roots in Asian traditional medicine, often used to build vitality.",
    uses: [
      { use: "Immune support", description: "Enhances immune function" },
      { use: "Vitality", description: "Promotes energy and strength" }
    ],
    region: "China, Mongolia, Korea",
    plantType: "Herbaceous perennial",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Immune boosting", "Energy enhancement", "Stress reduction"],
    cautions: ["May interact with immunosuppressant medications"],
    tags: ["Immune Enhancer", "Vitality"],
    image: "/images/astragalus.jpg",
    cultivationNotes: "Requires well-drained soil and takes 3-6 years to mature for harvest"
  },
  {
    name: "Turmeric",
    scientificName: "Curcuma longa",
    commonNames: ["Curcuma", "Haldi"],
    description: "A bright yellow rhizome known for curcumin, anti-inflammatory support, and digestive balance.",
    uses: [
      { use: "Digestive support", description: "Stimulates bile production" },
      { use: "Anti-inflammatory support", description: "Curcumin reduces inflammation" }
    ],
    region: "Southeast Asia",
    plantType: "Herbaceous perennial",
    ayushSystem: ["Ayurveda", "Siddha", "Unani"],
    potentialBenefits: ["Anti-inflammatory", "Digestive aid", "Antioxidant", "Joint support"],
    cautions: ["May increase bleeding risk if taking anticoagulants"],
    tags: ["Digestive Health", "Anti-inflammatory"],
    image: "/images/turmeric.jpg",
    cultivationNotes: "Prefers warm, humid climate with well-drained soil"
  },
  {
    name: "Ginger",
    scientificName: "Zingiber officinale",
    commonNames: ["Common ginger", "Adrak"],
    description: "A spicy aromatic rhizome used to support digestion, calm nausea, and ease inflammation.",
    uses: [
      { use: "Digestive support", description: "Aids digestion and reduces bloating" },
      { use: "Immune support", description: "Warming and anti-inflammatory" }
    ],
    region: "Southeast Asia",
    plantType: "Herbaceous perennial",
    ayushSystem: ["Ayurveda", "Siddha", "Unani"],
    potentialBenefits: ["Digestive aid", "Anti-nausea", "Anti-inflammatory", "Circulation support"],
    cautions: ["May increase bleeding risk in high doses"],
    tags: ["Digestive Aid", "Anti-inflammatory"],
    image: "/images/ginger.jpg",
    cultivationNotes: "Prefers partial shade and moist soil"
  },
  {
    name: "Garlic",
    scientificName: "Allium sativum",
    commonNames: ["Common garlic", "Lasun"],
    description: "A bulbous plant known for strong flavor, antimicrobial compounds, and cardiovascular support.",
    uses: [
      { use: "Cardiovascular support", description: "Supports healthy cholesterol levels" },
      { use: "Immune support", description: "Allicin and other compounds support immunity" }
    ],
    region: "Central Asia",
    plantType: "Bulbous perennial",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Cardiovascular health", "Immune support", "Antimicrobial", "Anti-inflammatory"],
    cautions: ["May interact with blood thinners; may cause digestive upset"],
    tags: ["Antimicrobial", "Heart Health"],
    image: "/images/garlic.jpg",
    cultivationNotes: "Requires cold period for bulb formation; well-drained soil"
  },
  {
    name: "Andrographis",
    scientificName: "Andrographis paniculata",
    commonNames: ["King of bitters", "Kalmegh"],
    description: "A bitter herb with green leaves and white flowers, often used for fever reduction and immune response.",
    uses: [
      { use: "Immune support", description: "Supports immune response" },
      { use: "Respiratory relief", description: "Traditionally used for respiratory health" }
    ],
    region: "South Asia",
    plantType: "Herbaceous annual",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Immune support", "Fever reduction", "Respiratory health", "Anti-inflammatory"],
    cautions: ["Very bitter; may cause gastrointestinal upset in sensitive individuals"],
    tags: ["Immune Support", "Fever Reduction"],
    image: "/images/Andrographis.jpg",
    cultivationNotes: "Prefers warm temperatures and well-drained soil"
  },
  {
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    commonNames: ["True aloe", "Ghritkumari"],
    description: "A succulent with soothing gel-rich leaves used for skin hydration, irritation relief, and minor burns.",
    uses: [
      { use: "Skin hydration", description: "Deep moisturizing gel" },
      { use: "Burn relief", description: "Soothes minor burns and irritation" }
    ],
    region: "Arabian Peninsula",
    plantType: "Succulent perennial",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Skin moisturizing", "Wound healing", "Anti-inflammatory", "Soothing"],
    cautions: ["Latex should not be ingested; gel is generally safe"],
    tags: ["Moisturising", "Healing"],
    image: "/images/aloe vera.jpg",
    cultivationNotes: "Low water requirement; prefers full sun and well-drained soil"
  },
  {
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    commonNames: ["German chamomile", "Wild chamomile"],
    description: "A small daisy-like flower used to calm irritated skin and support rest and relaxation.",
    uses: [
      { use: "Skin calming", description: "Soothing for sensitive skin" },
      { use: "Relaxation", description: "Promotes calm and restful sleep" }
    ],
    region: "Europe and Western Asia",
    plantType: "Annual herb",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Skin soothing", "Relaxation", "Sleep support", "Anti-inflammatory"],
    cautions: ["May cause allergic reactions in those allergic to ragweed"],
    tags: ["Calming", "Skin Support"],
    image: "/images/chamomile.jpg",
    cultivationNotes: "Easy to grow; prefers full sun and well-drained soil"
  },
  {
    name: "Tea Tree",
    scientificName: "Melaleuca alternifolia",
    commonNames: ["Australian tea tree"],
    description: "A shrub known for essential oils with antibacterial properties used in acne-focused skin care.",
    uses: [
      { use: "Acne care", description: "Supports clear, healthy skin" },
      { use: "Antibacterial support", description: "Strong antimicrobial properties" }
    ],
    region: "Australia",
    plantType: "Evergreen shrub",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Antibacterial", "Acne support", "Antifungal", "Scalp health"],
    cautions: ["Essential oil should not be ingested; dilute before skin application"],
    tags: ["Antibacterial", "Acne Care"],
    image: "/images/tea tree.jpg",
    cultivationNotes: "Requires well-drained soil; drought tolerant once established"
  },
  {
    name: "Amla",
    scientificName: "Phyllanthus emblica",
    commonNames: ["Indian gooseberry", "Amlaki"],
    description: "A vitamin C-rich fruit used as a rejuvenating herb in Ayurvedic traditions for centuries.",
    uses: [
      { use: "Immune support", description: "Very high in vitamin C" },
      { use: "Antioxidant support", description: "Powerful antioxidant properties" },
      { use: "Hair health", description: "Traditionally used for hair vitality" }
    ],
    region: "India",
    plantType: "Deciduous tree",
    ayushSystem: ["Ayurveda", "Siddha"],
    potentialBenefits: ["Immune boosting", "Antioxidant rich", "Hair and skin health", "Collagen support"],
    cautions: ["May have mild laxative effect in some individuals"],
    tags: ["Immune Enhancer", "Rejuvenation"],
    image: "/images/amla.jpg",
    cultivationNotes: "Grows well in tropical and subtropical climates"
  },
  {
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    commonNames: ["Indian ginseng", "Withania"],
    description: "An adaptogenic shrub known for supporting resilience, vitality, and recovery from stress.",
    uses: [
      { use: "Stress resilience", description: "Adaptogenic for stress management" },
      { use: "Energy and stamina", description: "Promotes strength and vitality" },
      { use: "Sleep quality", description: "Supports restful sleep" }
    ],
    region: "India and Southeast Asia",
    plantType: "Herbaceous shrub",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Adaptogen", "Stress relief", "Sleep support", "Energy enhancement", "Immune support"],
    cautions: ["May interact with sedatives; avoid during pregnancy"],
    tags: ["Adaptogenic", "Stress Relief"],
    image: "/images/ashwagandha.png",
    cultivationNotes: "Prefers dry climate with well-drained soil"
  },
  {
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    commonNames: ["Water hyssop", "Brahmi"],
    description: "A creeping herb valued for supporting memory, concentration, and mental clarity.",
    uses: [
      { use: "Memory support", description: "Enhances cognitive function" },
      { use: "Mental clarity", description: "Supports focus and alertness" },
      { use: "Concentration", description: "Improves concentration ability" }
    ],
    region: "India and Southeast Asia",
    plantType: "Herbaceous creeper",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Memory enhancement", "Mental clarity", "Brain health", "Anxiety relief"],
    cautions: ["Generally well tolerated; may cause nausea in some"],
    tags: ["Cognitive Support", "Mental Clarity"],
    image: "/images/brahmi.jpg",
    cultivationNotes: "Thrives in moist conditions; often grown in water gardens"
  },
  {
    name: "Guduchi",
    scientificName: "Tinospora cordifolia",
    commonNames: ["Giloy", "Amrita"],
    description: "A climbing shrub considered an elixir of life in Ayurveda for its restorative properties.",
    uses: [
      { use: "Immune support", description: "Powerful immune enhancer" },
      { use: "Detoxification", description: "Supports natural detox processes" },
      { use: "Resilience", description: "Promotes overall wellness" }
    ],
    region: "India",
    plantType: "Woody climber",
    ayushSystem: ["Ayurveda", "Siddha"],
    potentialBenefits: ["Immune boosting", "Detoxification", "Fever reduction", "Digestive support"],
    cautions: ["Should not be used by those with autoimmune conditions"],
    tags: ["Immune Support", "Detox"],
    image: "/images/guduchi.jpg",
    cultivationNotes: "Grows as a woody climber; often harvested for stem and root"
  },
  {
    name: "Licorice",
    scientificName: "Glycyrrhiza glabra",
    commonNames: ["Mulethi", "Sweet root"],
    description: "A sweet root with soothing effects on the throat, stomach, and respiratory system.",
    uses: [
      { use: "Throat soothing", description: "Soothes irritated throat" },
      { use: "Digestive comfort", description: "Supports stomach health" },
      { use: "Respiratory support", description: "Supports clear airways" }
    ],
    region: "Middle East, Mediterranean, Central Asia",
    plantType: "Herbaceous perennial",
    ayushSystem: ["Ayurveda", "Unani"],
    potentialBenefits: ["Throat soothing", "Digestive support", "Respiratory health", "Anti-inflammatory"],
    cautions: ["May increase blood pressure in high doses; avoid with hypertension"],
    tags: ["Throat Support", "Respiratory Health"],
    image: "/images/licorice.jpg",
    cultivationNotes: "Takes 3 years to mature; prefers deep, well-drained soil"
  },
  {
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    commonNames: ["English lavender", "True lavender"],
    description: "A fragrant flowering plant associated with calming effects and skin-soothing properties.",
    uses: [
      { use: "Relaxation support", description: "Promotes calm and peace" },
      { use: "Skin soothing", description: "Soothes sensitive skin" },
      { use: "Sleep wellness", description: "Supports restful sleep" }
    ],
    region: "Mediterranean",
    plantType: "Evergreen shrub",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Relaxation", "Sleep support", "Skin soothing", "Anti-inflammatory"],
    cautions: ["Generally well tolerated; rare allergic reactions possible"],
    tags: ["Calming", "Skin Support"],
    image: "/images/lavender.jpg",
    cultivationNotes: "Prefers dry, well-drained soil and full sun; drought tolerant"
  },
  {
    name: "Calendula",
    scientificName: "Calendula officinalis",
    commonNames: ["Pot marigold", "Marigold"],
    description: "A bright orange flower known for supporting skin healing and reducing inflammation.",
    uses: [
      { use: "Skin healing", description: "Promotes skin regeneration" },
      { use: "Inflammation support", description: "Reduces skin inflammation" },
      { use: "Wound care", description: "Supports minor wound healing" }
    ],
    region: "Mediterranean",
    plantType: "Annual herb",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Skin healing", "Anti-inflammatory", "Wound support", "Antimicrobial"],
    cautions: ["May cause allergic reactions in those sensitive to Asteraceae family"],
    tags: ["Healing", "Anti-inflammatory"],
    image: "/images/calendula.jpg",
    cultivationNotes: "Easy to grow; self-seeds readily; prefers well-drained soil"
  },
  {
    name: "Rosehip",
    scientificName: "Rosa canina",
    commonNames: ["Dog rose", "Wild rose"],
    description: "A nutrient-dense fruit used in oils and serums for skin radiance and texture support.",
    uses: [
      { use: "Skin brightening", description: "Enhances skin radiance" },
      { use: "Moisture support", description: "Deep hydration for skin" },
      { use: "Anti-aging support", description: "Rich in antioxidants and vitamin A" }
    ],
    region: "Europe and Western Asia",
    plantType: "Deciduous shrub",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Skin brightening", "Anti-aging", "Vitamin C rich", "Collagen support"],
    cautions: ["Generally safe; may cause mild GI upset in some"],
    tags: ["Anti-aging", "Skin Radiance"],
    image: "/images/rosehip.jpg",
    cultivationNotes: "Hardy shrub; prefers well-drained soil and full sun"
  },
  {
    name: "Tulsi",
    scientificName: "Ocimum tenuiflorum",
    commonNames: ["Holy Basil", "The Queen of Herbs"],
    description: "A sacred plant in Hindu culture, Tulsi is an adaptogen that helps with stress relief and respiratory health.",
    uses: [
      { use: "Stress reduction", description: "Adaptogenic properties help the body cope with stress" },
      { use: "Respiratory support", description: "Relieves cough and cold symptoms" },
      { use: "Immune boost", description: "Enhances natural defense mechanisms" }
    ],
    region: "India and Southeast Asia",
    plantType: "Herbaceous perennial",
    ayushSystem: ["Ayurveda", "Unani", "Siddha"],
    potentialBenefits: ["Stress relief", "Respiratory health", "Antibacterial", "Antiviral"],
    cautions: ["May lower blood sugar; use with caution if diabetic"],
    tags: ["Sacred", "Adaptogen", "Respiratory"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Needs warm climate and regular watering"
  },
  {
    name: "Neem",
    scientificName: "Azadirachta indica",
    commonNames: ["Indian Lilac", "Margosa"],
    description: "Often called the 'Village Pharmacy', Neem is known for its powerful antibacterial and antifungal properties.",
    uses: [
      { use: "Skin health", description: "Treats acne and skin infections" },
      { use: "Purification", description: "Blood purifier in traditional medicine" },
      { use: "Pest control", description: "Natural insecticide and repellent" }
    ],
    region: "Indian Subcontinent",
    plantType: "Evergreen tree",
    ayushSystem: ["Ayurveda", "Unani", "Siddha", "Homeopathy"],
    potentialBenefits: ["Antimicrobial", "Blood purification", "Dental health", "Skin care"],
    cautions: ["Avoid during pregnancy; consult doctor for internal use"],
    tags: ["Purifying", "Antimicrobial", "Skin Care"],
    image: "https://images.unsplash.com/photo-1628151445749-3665243fb333?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Drought resistant; thrives in well-drained soil"
  },
  {
    name: "Shatavari",
    scientificName: "Asparagus racemosus",
    commonNames: ["Satavar", "Wild Asparagus"],
    description: "A queen of herbs for women's health, Shatavari is used as a rejuvenating tonic.",
    uses: [
      { use: "Reproductive health", description: "Supports hormonal balance and lactation" },
      { use: "Digestive aid", description: "Soothes the digestive tract" },
      { use: "Rejuvenation", description: "Nutritive tonic for vitality" }
    ],
    region: "India, Himalayas",
    plantType: "Climbing shrub",
    ayushSystem: ["Ayurveda", "Siddha"],
    potentialBenefits: ["Hormonal balance", "Digestive support", "Immune boost", "Antioxidant"],
    cautions: ["Avoid if sensitive to asparagus"],
    tags: ["Women's Health", "Rejuvenating", "Tonic"],
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Prefers partial shade and moist, rich soil"
  },
  {
    name: "Arjuna",
    scientificName: "Terminalia arjuna",
    commonNames: ["Arjun", "Kahu"],
    description: "A large tree whose bark is a primary Ayurvedic remedy for heart health.",
    uses: [
      { use: "Heart support", description: "Strengthens heart muscles" },
      { use: "Blood pressure", description: "Helps maintain healthy blood pressure levels" },
      { use: "Cholesterol control", description: "Supports healthy lipid profiles" }
    ],
    region: "Indian Subcontinent",
    plantType: "Deciduous tree",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Cardiovascular health", "Antioxidant", "Liver protection"],
    cautions: ["Consult a physician if on heart medication"],
    tags: ["Heart Health", "Circulation"],
    image: "https://images.unsplash.com/photo-1614308412351-7397e12360d3?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Commonly found near river banks"
  },
  {
    name: "Karela",
    scientificName: "Momordica charantia",
    commonNames: ["Bitter Melon", "Bitter Gourd"],
    description: "A tropical vine known for its bitter fruit, widely used for managing blood sugar levels.",
    uses: [
      { use: "Blood sugar balance", description: "Contains insulin-like compounds" },
      { use: "Digestive health", description: "Stimulates liver function" },
      { use: "Weight management", description: "Appetite regulation and metabolism support" }
    ],
    region: "Asia, Africa, Caribbean",
    plantType: "Climbing vine",
    ayushSystem: ["Ayurveda"],
    potentialBenefits: ["Diabetes support", "Detoxification", "Skin health"],
    cautions: ["Can cause hypoglycemia; avoid during pregnancy"],
    tags: ["Diabetes Support", "Bitter", "Detox"],
    image: "https://images.unsplash.com/photo-1593108625907-7a5d33e9ec24?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Requires trellis support and plenty of sunlight"
  },
  {
    name: "Haritaki",
    scientificName: "Terminalia chebula",
    commonNames: ["Harad", "Black Myrobalan"],
    description: "One of the three fruits in Triphala, Haritaki is called the 'King of Medicines' for its wide healing reach.",
    uses: [
      { use: "Digestive health", description: "Gentle laxative and digestive tonic" },
      { use: "Brain health", description: "Enhances cognitive function and memory" },
      { use: "Detoxification", description: "Cleanses the gastrointestinal tract" }
    ],
    region: "South Asia",
    plantType: "Deciduous tree",
    ayushSystem: ["Ayurveda", "Unani", "Siddha", "Sowa-Rigpa"],
    potentialBenefits: ["Longevity", "Digestive regularity", "Anti-inflammatory", "Antioxidant"],
    cautions: ["Not recommended during pregnancy or severe dehydration"],
    tags: ["King of Medicines", "Digestive", "Triphala"],
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Grows in various soil types; drought tolerant"
  },
  {
    name: "Shilajit",
    scientificName: "Asphaltum punjabianum",
    commonNames: ["Mineral Pitch", "Mumijo"],
    description: "A sticky substance found primarily in the rocks of the Himalayas, known as a powerful revitalizer.",
    uses: [
      { use: "Energy and stamina", description: "Boosts ATP production and reduces fatigue" },
      { use: "Anti-aging", description: "High fulvic acid content supports cellular health" },
      { use: "Brain function", description: "Supports cognitive health and memory" }
    ],
    region: "Himalayas",
    plantType: "Herbo-mineral",
    ayushSystem: ["Ayurveda", "Siddha"],
    potentialBenefits: ["Vitality", "Testosterone support", "Anti-inflammatory", "Anemia support"],
    cautions: ["Use only purified Shilajit; consult doctor for dosage"],
    tags: ["Vitality", "Mineral Rich", "Himalayan"],
    image: "https://images.unsplash.com/photo-1631541484179-82bbcf194488?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Exudes from Himalayan rocks in summer"
  },
  {
    name: "Vasaka",
    scientificName: "Justicia adhatoda",
    commonNames: ["Malabar Nut", "Adosa"],
    description: "A potent respiratory herb known for its bronchodilator and expectorant properties.",
    uses: [
      { use: "Respiratory health", description: "Relieves asthma, bronchitis, and cough" },
      { use: "Bleeding disorders", description: "Traditionally used to support blood clotting" },
      { use: "Fever relief", description: "Helps reduce high body temperature" }
    ],
    region: "Asia",
    plantType: "Evergreen shrub",
    ayushSystem: ["Ayurveda", "Unani", "Siddha"],
    potentialBenefits: ["Respiratory relief", "Anti-spasmodic", "Antibacterial"],
    cautions: ["Consult doctor before use in children or during pregnancy"],
    tags: ["Respiratory", "Bronchitis", "Lungs"],
    image: "https://images.unsplash.com/photo-1588661701383-8d00331002e7?auto=format&fit=crop&q=80&w=800",
    cultivationNotes: "Grows easily in tropical climates with minimal care"
  }
];

export default plantsSeedData;
