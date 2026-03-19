const videosData = [
  {
    title: "Introduction to Medicinal Plants",
    slug: "intro-medicinal-plants",
    description: "Getting started with medicinal plant identification and use. This comprehensive guide covers the history of medicinal plants dating back to prehistoric times, including Egyptian herbals from 1550 BC and Dioscorides' De Materia Medica. Learn how over 50,000 medicinal plant species are used worldwide, with approximately 25% of modern pharmaceutical drugs derived from plant sources. Discover the four main biochemical classes of plant compounds: alkaloids, glycosides, polyphenols, and terpenes. Understand the basic principles of plant medicine and how to safely begin your journey into herbalism.",
    url: "https://www.youtube.com/watch?v=GhwlLiB3Yos",
    duration: "5:30",
    category: "beginner",
    learning_objectives: [
      "Understand the history and global significance of medicinal plants",
      "Learn the four main biochemical classes of plant compounds",
      "Identify safety considerations for herbal medicine",
      "Discover the role of medicinal plants in modern medicine"
    ],
    target_audience: "Beginners, general learners",
    techniques_covered: "Plant identification, historical context, safety principles",
    related_plants: "Willow, Poppy, Opium, Aloe, Cannabis, Garlic, Jutuniper, Mandrake",
    keywords_tags: "medicinal plants, herbalism, history, plant medicine, phytochemistry",
    order: 1
  },
  {
    title: "Traditional Herbal Tea Preparation",
    slug: "herbal-tea-preparation",
    description: "Master the art of preparing medicinal herbal teas at home. Learn the difference between infusions and decoctions, the two primary methods for extracting herbal benefits into water. Infusions involve steeping delicate herbs like chamomile and mint in hot water, while decoctions use boiling to extract properties from tougher plant materials like roots and bark. Discover maceration techniques for mucilage-rich plants like sage and thyme, requiring 7-12 hours of cold infusion. Master proper temperature control, steeping times, and storage methods. Understand how water as a polar solvent extracts specific plant compounds, and learn to create custom tea blends for various health purposes.",
    url: "https://www.youtube.com/watch?v=mKxTv0_5rP8",
    duration: "3:45",
    category: "preparation",
    learning_objectives: [
      "Distinguish between infusions and decoctions",
      "Master proper steeping techniques and temperatures",
      "Learn maceration methods for delicate plants",
      "Create custom herbal tea blends"
    ],
    target_audience: "Beginners, intermediate learners",
    techniques_covered: "Infusions, decoctions, maceration, steeping, blending",
    related_plants: "Chamomile, Mint, Sage, Thyme, Ginger, Rhubarb, Cascara",
    keywords_tags: "herbal tea, infusion, decoction, maceration, tea preparation",
    order: 2
  },
  {
    title: "Making Herbal Tinctures & Extracts",
    slug: "herbal-tinctures-extracts",
    description: "Explore the powerful world of herbal tinctures and extracts. Tinctures are alcoholic extracts typically containing 25-90% ethanol, creating concentrated herbal remedies that are stronger than herbal teas and easier to store. Learn how to create tinctures using pure ethanol or ethanol-water mixtures, discovering why alcohol is an ideal solvent for extracting non-polar plant compounds. Understand the differences between tinctures, herbal wines (12-38% ethanol), and elixirs. Discover non-alcoholic alternatives using glycerin, and explore advanced extraction methods including vacuum distillation for liquid extracts and evaporation for dry extracts. Master dosaging, shelf life considerations, and proper storage in glass bottles.",
    url: "https://www.youtube.com/watch?v=QlqxVcBnBx0",
    duration: "7:15",
    category: "intermediate",
    learning_objectives: [
      "Understand tincture chemistry and alcohol's role as a solvent",
      "Create tinctures using various ethanol concentrations",
      "Master extraction timing and ratios",
      "Learn storage and shelf-life management",
      "Explore non-alcoholic alternatives"
    ],
    target_audience: "Intermediate to advanced learners",
    techniques_covered: "Tincture making, alcohol extraction, non-alcoholic extracts, distillation",
    related_plants: "Echinacea, St. John's Wort, Goldenseal, Valerian, Licorice",
    keywords_tags: "tinctures, extracts, alcohol extraction, herbal remedies, preservation",
    order: 3
  },
  {
    title: "Growing Medicinal Plants at Home",
    slug: "growing-medicinal-plants",
    description: "Start your home medicinal garden with comprehensive growing guidance. Learn how medicinal plants require intensive management with specific cultivation conditions for each species. Discover soil preparation, sunlight requirements, and water management for 20+ medicinal plants. Understand crop rotation to minimize pests and diseases, as recommended by the World Health Organization. Explore conservation agriculture practices including no-till farming systems to maintain soil health and conserve water. Learn about seasonal planting calendars, hardiness zones, and container gardening alternatives. Master pest management without harmful chemicals and understand how plant characteristics vary with soil type and cropping strategy, affecting potency and yield.",
    url: "https://www.youtube.com/watch?v=SEP6KthJrwo",
    duration: "9:20",
    category: "beginner",
    learning_objectives: [
      "Understand specific cultivation requirements for medicinal plants",
      "Master soil preparation and nutrient management",
      "Learn crop rotation and pest management strategies",
      "Discover seasonal planting and harvesting calendars",
      "Implement water conservation techniques"
    ],
    target_audience: "Gardeners, beginners",
    techniques_covered: "Garden design, soil preparation, crop rotation, pest management, irrigation",
    related_plants: "Chamomile, Echinacea, St. John's Wort, Lemon balm, Lavender, Sage, Thyme",
    keywords_tags: "medicinal garden, organic gardening, plant cultivation, soil health",
    order: 4
  },
  {
    title: "Seasonal Harvesting of Medicinal Plants",
    slug: "seasonal-harvesting",
    description: "Learn the optimal timing and techniques for harvesting medicinal plants at peak potency. Different plant parts contain different compounds that vary throughout the seasons and even times of day. Understand why roots and bulbs are best harvested in fall after the plant's energy has moved underground, while aerial parts like leaves and flowers should be harvested in late spring or early summer. Discover how alkaloid content in plants like deadly nightshade is more concentrated in specific seasons, making harvesting timing critical for safety and efficacy. Learn proper cutting techniques that don't damage plants, drying methods that preserve potency, and storage solutions. Understand sustainability principles for wild-harvesting and the threats of over-collection to endangered plant species.",
    url: "https://www.youtube.com/watch?v=7tEL85PIi-w",
    duration: "6:45",
    category: "intermediate",
    learning_objectives: [
      "Understand seasonal variation in plant potency",
      "Master harvesting techniques for different plant parts",
      "Learn proper drying and storage methods",
      "Discover sustainable harvesting practices",
      "Understand alkaloid and compound timing"
    ],
    target_audience: "Intermediate growers, herbalists",
    techniques_covered: "Harvesting timing, cutting techniques, drying, storage, sustainability",
    related_plants: "Roots, bark, leaves, flowers, seeds across all medicinal species",
    keywords_tags: "harvesting, seasonal timing, drying herbs, plant potency, sustainability",
    order: 5
  },
  {
    title: "Ashwagandha: Ancient Adaptogen",
    slug: "ashwagandha-adaptogen",
    description: "Deep dive into Ashwagandha, one of Ayurveda's most revered adaptogenic herbs. Known as 'Indian Winter Cherry' or 'Withania somnifera,' Ashwagandha has been used for over 5,000 years in Ayurvedic medicine to balance doshas and reduce stress. Learn how this powerful plant helps regulate cortisol levels, improve sleep quality, and enhance cognitive function. Understand the different forms: whole root powder, standardized extracts, and traditional preparations. Discover growing requirements in warm climates, proper harvesting techniques to capture maximum alkaloid content, and traditional Ayurvedic applications. Explore modern scientific research validating traditional uses and optimal dosaging for stress relief, improved strength, and better sleep patterns.",
    url: "https://www.youtube.com/watch?v=H_AXxwi2CjQ",
    duration: "8:30",
    category: "intermediate",
    learning_objectives: [
      "Understand Ashwagandha's role in Ayurvedic medicine",
      "Learn traditional and modern applications",
      "Master growing and harvesting techniques",
      "Explore preparation methods and dosaging",
      "Understand adaptogenic properties"
    ],
    target_audience: "Intermediate learners, Ayurveda enthusiasts",
    techniques_covered: "Plant identification, cultivation, harvesting, preparation, dosaging",
    related_plants: "Other adaptogens (Rhodiola, Ginseng), stress-relief herbs",
    keywords_tags: "Ashwagandha, Ayurveda, adaptogens, stress relief, sleep support",
    order: 6
  },
  {
    title: "Turmeric & Curcumin: Golden Root Medicine",
    slug: "turmeric-curcumin",
    description: "Explore turmeric, the golden spice with powerful medicinal properties from Ayurvedic and Chinese medicine traditions. Learn how turmeric contains curcumin, a potent polyphenolic compound responsible for its anti-inflammatory and antioxidant effects. Discover traditional uses in both Ayurveda for balancing Pitta dosha and in TCM for improving circulation and reducing pain. Understand cultivation requirements in tropical and subtropical climates, optimal harvesting times when rhizomes are most potent, and proper drying techniques. Master preparation methods including fresh root, dried powder, golden milk (turmeric latte), and extraction techniques. Explore the importance of black pepper (piperine) in enhancing curcumin bioavailability and learn modern scientific research supporting traditional applications.",
    url: "https://www.youtube.com/watch?v=dBnvKm2XPc0",
    duration: "7:30",
    category: "intermediate",
    learning_objectives: [
      "Learn turmeric's traditional medicinal applications",
      "Understand curcumin's chemical properties and benefits",
      "Master cultivation and harvesting techniques",
      "Discover preparation methods and recipes",
      "Learn bioavailability enhancement techniques"
    ],
    target_audience: "Intermediate learners, cooking enthusiasts",
    techniques_covered: "Plant cultivation, rhizome harvesting, drying, extraction, cooking",
    related_plants: "Ginger, Black Pepper, Other anti-inflammatory herbs",
    keywords_tags: "turmeric, curcumin, polyphenols, anti-inflammatory, golden milk",
    order: 7
  },
  {
    title: "Ginger Root: Essential Warming Herb",
    slug: "ginger-warming-herb",
    description: "Master ginger, an essential warming herb used for thousands of years across Ayurveda, TCM, and Western herbalism. Learn how ginger's hot, pungent properties make it ideal for improving digestion, reducing nausea, and providing warming circulation support. Understand different forms: fresh root, dried powder, crystallized, and extracts, each offering unique benefits. Discover rhizome selection and cultivation requirements for year-round harvesting. Learn how to distinguish between young ginger (more tender, less pungent) and mature ginger (more potent, drying in nature). Explore traditional applications including ginger tea for digestion and circulation, and modern research validating its anti-inflammatory and gastroprotective properties. Master storage techniques for both fresh and dried ginger and creative culinary applications.",
    url: "https://www.youtube.com/watch?v=rlzLgxlUhQY",
    duration: "6:20",
    category: "beginner",
    learning_objectives: [
      "Understand ginger's warming properties in traditional medicine",
      "Master rhizome selection and cultivation",
      "Learn preparation methods from fresh to powdered",
      "Discover traditional and modern applications",
      "Explore storage and preservation techniques"
    ],
    target_audience: "Beginners, cooking enthusiasts",
    techniques_covered: "Rhizome cultivation, harvesting, drying, storage, preparation",
    related_plants: "Turmeric, Cardamom, Black Pepper, other warming spices",
    keywords_tags: "ginger, warming herbs, digestion, circulation, traditional medicine",
    order: 8
  },
  {
    title: "Essential Oils & Aromatherapy",
    slug: "essential-oils-aromatherapy",
    description: "Discover the concentrated power of essential oils and aromatherapy applications. Essential oils are extracted through distillation of aromatic herbs like lavender, eucalyptus, and thyme, capturing terpenes and volatile compounds responsible for plant scent and therapeutic effects. Learn steam distillation techniques, cold-pressing for citrus oils, and solvent extraction for delicate flowers. Understand how these lipophilic oils differ from water-based infusions, requiring proper dilution protocols for safety. Explore inhalation methods including diffusion, steam inhalation, and direct aromatic application. Master topical use by creating diluted blends with carrier oils like jojoba, almond, or olive oil for massage, salves, and skin applications. Discover psychological and physical benefits including stress relief, improved respiratory function, and skin health support.",
    url: "https://www.youtube.com/watch?v=RRq0EXS5g1A",
    duration: "8:00",
    category: "intermediate",
    learning_objectives: [
      "Understand essential oil extraction methods",
      "Learn terpene chemistry and aromatherapy principles",
      "Master safe dilution and application techniques",
      "Explore inhalation methods and benefits",
      "Learn to create topical blends safely"
    ],
    target_audience: "Intermediate learners, aromatherapy enthusiasts",
    techniques_covered: "Distillation, extraction, dilution, inhalation, topical application",
    related_plants: "Lavender, Eucalyptus, Peppermint, Rose, Lemon, Thyme, Rosemary",
    keywords_tags: "essential oils, aromatherapy, terpenes, distillation, topical blends",
    order: 9
  },
  {
    title: "Salves, Balms & Topical Applications",
    slug: "salves-balms-topical",
    description: "Learn to create healing salves, balms, creams, and lotions for topical herbalism. These preparations involve infusing medicinal plants into food-grade oils like coconut, olive, or almond oil for weeks to months, allowing lipophilic plant compounds to transfer into the oil matrix. Understand the chemistry of different oil types and their skin absorption properties. Learn how to incorporate essential oils, beeswax for solidifying, and other ingredients into stable formulations. Master traditional poultice techniques involving boiled plant material wrapped in cloth for external application. Discover applications including wound healing, skin irritation relief, muscle tension support, and massage therapy integration. Learn proper storage in glass containers to prevent oxidation and extend shelf life. Explore therapeutic benefits of different carrier oils and herb combinations for specific skin conditions.",
    url: "https://www.youtube.com/watch?v=nM5vJxGUjJ0",
    duration: "7:45",
    category: "intermediate",
    learning_objectives: [
      "Understand oil infusion processes and chemistry",
      "Master salve and balm formulation techniques",
      "Learn poultice preparation methods",
      "Discover proper storage and preservation",
      "Explore therapeutic applications"
    ],
    target_audience: "Intermediate learners, herbalists",
    techniques_covered: "Oil infusion, emulsification, beeswax incorporation, poultice making",
    related_plants: "Calendula, Comfrey, St. John's Wort, Plantain, Arnica",
    keywords_tags: "salves, balms, topical herbs, oil infusion, wound healing, massage oils",
    order: 10
  },
  {
    title: "Herbal Safety & Drug Interactions",
    slug: "herbal-safety-interactions",
    description: "Master critical safety information for responsible herbal medicine use. While herbal medicines are perceived as safe due to their natural origin, they can cause serious adverse effects and dangerous drug interactions. Learn about potentially toxic herbs including deadly nightshade (containing atropine), aconite (often legally restricted), and licorice (causing potassium depletion with chronic use). Understand how herbal compounds can interfere with cytochrome P450 enzymes critical to drug metabolism, extending medication duration and creating cumulative effects. Discover specific herb-drug interactions including anticoagulant amplification and blood pressure medication interactions. Learn why herbal medicine requires professional consultation and proper dosing standardization. Understand pregnancy concerns with herbal use and populations at higher risk (elderly, children, immunocompromised). Explore how natural does not equate to safe, and discover quality and labeling challenges in the herbal market.",
    url: "https://www.youtube.com/watch?v=WXXM71PqVk0",
    duration: "9:00",
    category: "advanced",
    learning_objectives: [
      "Understand potential adverse effects of herbal medicine",
      "Learn herb-drug interaction mechanisms",
      "Discover populations requiring special precautions",
      "Master dosing and standardization principles",
      "Learn regulatory and quality considerations"
    ],
    target_audience: "Advanced learners, healthcare practitioners, serious herbalists",
    techniques_covered: "Pharmacology, drug interactions, safety protocols, quality assessment",
    related_plants: "All medicinal herbs with emphasis on potentially toxic species",
    keywords_tags: "herbal safety, drug interactions, toxicity, adverse effects, dosing",
    order: 11
  },
  {
    title: "Medicinal Plant Identification Guide",
    slug: "plant-identification-guide",
    description: "Develop essential skills for accurate medicinal plant identification in the wild and garden. Learn morphological characteristics including leaf shape (opposite, alternate, whorled), stem structure, flower characteristics, and root systems that distinguish plant families. Understand how to identify popular medicinal plants including nettles (common weeds with medicinal value), dandelions (widespread healing herb), lavender (distinctive purple flowers and aromatic leaves), and sage (grey-green wrinkled leaves). Master the use of field guides, botanical keys, and seasonal identification markers. Learn photography techniques for documenting unknowns and consultation resources. Understand the critical safety consideration: never harvest wild plants without 100% positive identification, as many toxic plants resemble edible medicinal species. Discover look-alike dangers and how to verify plant identity through multiple characteristics before harvesting or use.",
    url: "https://www.youtube.com/watch?v=cHfvD5-5S1w",
    duration: "10:15",
    category: "beginner",
    learning_objectives: [
      "Master plant morphological characteristics",
      "Learn key identification features for common medicinal plants",
      "Understand botanical key usage",
      "Discover look-alike dangers and safety precautions",
      "Master field documentation techniques"
    ],
    target_audience: "Beginners, wildcrafters, foragers",
    techniques_covered: "Morphology, field guides, botanical keys, safety verification",
    related_plants: "Nettles, Dandelion, Lavender, Sage, Wild ginger, Plantain, etc.",
    keywords_tags: "plant identification, wildlifting, foraging, safety, morphology",
    order: 12
  },
  {
    title: "Traditional vs Modern Herbal Medicine",
    slug: "traditional-vs-modern",
    description: "Explore the fascinating intersection of traditional herb knowledge and modern scientific validation. For over 5,000 years, traditional medicine systems including Ayurveda, TCM, Unani, Siddha, and Sowa-Rigpa have refined herbal practices through careful observation and documentation. Understand how ancient texts like Charaka Samhita, De Materia Medica (documenting 600+ plants in 60 AD), and Chinese medical texts systematized herbal knowledge. Learn how modern pharmacology has validated many traditional uses through clinical trials and chemical analysis, with approximately 25% of modern pharmaceutical drugs derived from plants. Discover famous examples including morphine from poppies, quinine from cinchona bark, and artemisinin from sweet wormwood (validated with Nobel Prize). Understand the differences in approach: traditional systems see plants holistically while modern medicine isolates active compounds. Explore ongoing research validating traditionally-used plants and the importance of maintaining traditional knowledge systems.",
    url: "https://www.youtube.com/watch?v=b7y7rxR9aWc",
    duration: "8:45",
    category: "intermediate",
    learning_objectives: [
      "Understand historical development of traditional herbal systems",
      "Learn how modern science validates traditional uses",
      "Discover pharmaceutical origins from medicinal plants",
      "Master the balance between traditional and scientific approaches",
      "Understand clinical trial validation methods"
    ],
    target_audience: "Intermediate learners, curious learners",
    techniques_covered: "Historical research, pharmacology, clinical trials, active compound isolation",
    related_plants: "Representative plants from various traditional systems",
    keywords_tags: "traditional medicine, modern pharmacology, clinical trials, scientific validation",
    order: 13
  },
  {
    title: "Drying, Storage & Preservation Techniques",
    slug: "drying-storage-preservation",
    description: "Master the art of preserving medicinal plants to maintain potency over seasons. Proper drying is the foundation of herbal preservation, requiring specific humidity and temperature conditions to prevent mold while preserving active compounds. Learn air-drying techniques using screens in well-ventilated spaces, oven-drying methods with careful temperature monitoring, and dehumidifier-assisted drying for humid climates. Understand how different plant parts (leaves, flowers, roots, bark, seeds) require different drying times and conditions. Master storage principles using glass containers with tight seals in cool, dark locations to prevent oxidation and light degradation of compounds. Learn labeling requirements including plant name, harvesting date, and drying date for rotation management. Discover how proper storage extends shelf life from months to years while maintaining therapeutic potency. Explore moisture indicators, oxygen absorbers, and freezer storage for extended preservation of valuable preparations.",
    url: "https://www.youtube.com/watch?v=NaTkDWDtPAU",
    duration: "7:20",
    category: "intermediate",
    learning_objectives: [
      "Master air-drying techniques and conditions",
      "Learn mechanical drying methods",
      "Understand moisture and temperature management",
      "Discover optimal storage containers and conditions",
      "Learn shelf-life management and rotation"
    ],
    target_audience: "Intermediate learners, herbalists",
    techniques_covered: "Air drying, oven drying, storage conditions, container selection, labeling",
    related_plants: "All medicinal herbs across different plant parts",
    keywords_tags: "drying herbs, preservation, storage, potency maintenance, shelf-life",
    order: 14
  },
  {
    title: "Building Your Herbal Medicine Cabinet",
    slug: "herbal-medicine-cabinet",
    description: "Create a well-stocked home herbal medicine cabinet with essential remedies for common health concerns. Start with foundational herbs that address multiple conditions: chamomile for relaxation and digestion, ginger for warming and circulation support, echinacea for immune support, and peppermint for respiratory and digestive health. Build your collection based on your family's specific needs and geographic region. Include multiple forms of key herbs (dried, tincture, essential oil, salve) for flexibility in application. Learn organization systems for easy identification and accessibility. Understand importance of labeling with harvesting dates for rotation management. Discover storage solutions that protect from light (dark glass bottles), moisture, and heat. Master basic first-aid applications including wound support, fever relief, cough management, and digestive support. Learn safety protocols for storage around children and pets, and document family herb preferences and sensitivities.",
    url: "https://www.youtube.com/watch?v=pJ-xyGXjsM0",
    duration: "6:50",
    category: "beginner",
    learning_objectives: [
      "Learn essential herbs for home medicine cabinet",
      "Understand multiple preparation forms and uses",
      "Master storage organization and labeling",
      "Discover first-aid herbal applications",
      "Learn safety protocols for families"
    ],
    target_audience: "Beginners, families, home herbalists",
    techniques_covered: "Herb selection, organization, storage, safety protocols, first-aid",
    related_plants: "Chamomile, Ginger, Echinacea, Peppermint, Lavender, Sage",
    keywords_tags: "home medicine cabinet, herbal first-aid, organization, storage, basics",
    order: 15
  }
];

export default videosData;
