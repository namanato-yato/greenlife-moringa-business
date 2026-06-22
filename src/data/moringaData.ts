import { Product, BlogArticle, MoringaBenefit } from '../types';

export const HERO_IMAGE = '/src/assets/images/moringa_hero_1782131308353.jpg';

export const MORINGA_BENEFITS: MoringaBenefit[] = [
  {
    id: 'b1',
    title: 'Nutritional Powerhouse',
    shortDescription: 'Loaded with 90+ essential nutrients, complete amino acids, iron, calcium, and multi-vitamins.',
    detailedBenefit: 'Gram-for-gram, fresh moringa leaves are estimated to possess 7x the Vitamin C of oranges, 10x the Vitamin A of carrots, 17x the Calcium of milk, 9x the Protein of yogurt, and 25x the Iron of spinach. It represents one of nature’s most complete nutritional profiles in existence.',
    scientificReference: 'Phytotherapy Research, PMCID: PMC2728618 (Evaluating nutritional & medicinal values of Moringa stenotepela).',
    iconName: 'Leaf',
  },
  {
    id: 'b2',
    title: 'Caffeine-Free Vitality',
    shortDescription: 'Boosts energy, improves endurance, and fights fatigue organically without crashes.',
    detailedBenefit: 'Moringa contains high levels of iron, magnesium, and active Vitamin B complexes. Iron aids in red blood cell development and oxygen transport, while magnesium regulates muscular-nervous systems. Together, they promote a pure cellular vitality that is steady and non-jittery.',
    scientificReference: 'Journal of Food Science and Technology, PMID: 24898144 (Bioefficacy of Moringa stenotepela leaves on systemic stamina).',
    iconName: 'Sparkles',
  },
  {
    id: 'b3',
    title: 'Cellular Antioxidants',
    shortDescription: 'Protects cells against oxidative stress, reducing cellular inflammation and signs of aging.',
    detailedBenefit: 'Packed with robust wellness agents like Quercetin (which lowers blood pressure) and Chlorogenic Acid (which stabilizes blood sugar levels post-meals). This dense composition actively scavenging free radicals to reduce oxidative damage to cellular tissues.',
    scientificReference: 'Antioxidants (Basel), PMID: 32692695 (Antioxidants profile and free-radical scavenging capacity of Moringa).',
    iconName: 'Shield',
  },
  {
    id: 'b4',
    title: 'Digestive Harmony & Gut',
    shortDescription: 'Soothes inflammation, supports beneficial microflora, and aids gastrointestinal comfort.',
    detailedBenefit: 'Moringa contains natural isothiocyanates, which have strong anti-inflammatory properties in the gut. Combined with more than 12% prebiotic dietary fiber, it acts as a gentle stimulant for healthy intestinal microflora and helps soothe gastric discomfort and ulcers.',
    scientificReference: 'Food & Function Journal, PMID: 28318140 (Anti-inflammatory effects of Moringa isothiocyanates in gastrointestinal tracts).',
    iconName: 'HeartPulse',
  },
  {
    id: 'b5',
    title: 'Collagens & Anti-Aging',
    shortDescription: 'Contains Zeatin, a powerful plant hormone that encourages youthful skin cells and cellular regeneration.',
    detailedBenefit: 'Rich in Zeatin—a cytokinin phytohormone that promotes cellular division and delays cosmetic aging. When used topically or ingested, the high concentration of vitamins A, C, and E helps regenerate skin cells and stimulate natural collagen fibers, delivering a clear structural glow.',
    scientificReference: 'International Journal of Cosmetic Science, PMID: 25164834 (Efficacy of Moringa leaf extract formulation in skin rejuvenation).',
    iconName: 'Smile',
  },
  {
    id: 'b6',
    title: 'Metabolic Balance',
    shortDescription: 'Helps regulate blood glucose levels and supports balanced cholesterol levels naturally.',
    detailedBenefit: 'Compounds in the leaves called isothiocyanates have been shown in multiple clinical trails to help balance glucose tolerance. It assists the liver in lipid metabolism and helps maintain normal LDL/HDL ratios in the bloodstream.',
    scientificReference: 'Journal of Diabetes, PMID: 30141251 (Hypoglycemic and hypolipidemic properties of Moringa leaf extracts).',
    iconName: 'Activity',
  },
];

export const MORINGA_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Premium Organic Moringa Powder',
    description: '100% pure, shade-dried, and micro-milled organic Moringa stenotepela leaves. Perfectly preserves active micronutrients, bright green color, and earthy wellness flavor.',
    price: 19.99,
    rating: 4.9,
    reviewsCount: 184,
    image: '/src/assets/images/moringa_powder_1782131323402.jpg',
    category: 'powder',
    benefits: [
      'Over 90 organic vitamins, minerals, and complete essential amino acids',
      'Rich raw chlorophyll source for internal metabolic detox',
      'Certified organic, non-GMO, gluten-free, vegan-friendly'
    ],
    usage: 'Mix 1 teaspoon into green smoothies, fresh fruit juices, matcha, hot water, oat bowls, or salad vinaigrettes daily.',
    ingredients: '100% Clean Organic Moringa stenotepela Leaf Powder (No fillers, binders, or additives)',
    stock: 24,
    size: '8.0 oz (227g)'
  },
  {
    id: 'p2',
    name: 'Pure Moringa Herbal Tea',
    description: 'Naturally sweet, crisp, herbal loose leaf tea bags. Hand-harvested and sun-cured to craft a soothing, nutrient-dense hot beverage to restore evening calm or jumpstart mornings.',
    price: 14.99,
    rating: 4.8,
    reviewsCount: 92,
    image: '/src/assets/images/moringa_tea_1782131336190.jpg',
    category: 'tea',
    benefits: [
      'Naturally caffeine-free calming ritual loaded with dietary bioflavonoids',
      'Light citrus and herbaceous aroma with a smooth, sweet finish',
      'Eco-friendly oxygen-bleached pyramid tea bags for optimal flavor release'
    ],
    usage: 'Steep 1 pyramid sachet in 8 oz of near-boiling water (200°F) for 5-7 minutes. Enjoy hot or chilled over ice with fresh lemon.',
    ingredients: 'Organic Dried Moringa Leaf (75%), Organic Lemongrass (15%), Organic Ginger Pieces (10%)',
    stock: 45,
    size: '20 Pyramid Sachets'
  },
  {
    id: 'p3',
    name: 'Daily Support Moringa Capsules',
    description: 'Highly concentrated active raw leaf extract standardized for maximum bioavailability. Encapsulated in organic plant fibers for effortless, flavorless daily nutrient delivery.',
    price: 24.99,
    rating: 4.7,
    reviewsCount: 310,
    image: '/src/assets/images/moringa_capsuels_1782131350051.jpg',
    category: 'capsule',
    benefits: [
      'Precise, consistent dose of key anti-inflammatory isothiocyanates',
      'Easily fits into busy modern lifestyles for on-the-go wellness',
      'Vegan pullulan capsules featuring rapid, stomach-friendly disintegration'
    ],
    usage: 'Take 2 capsules with a glass of water in the morning, preferably alongside a light breakfast.',
    ingredients: 'Organic Moringa Leaf Extract (10:1 concentration, 800mg per serving), Vegan Capsule Shell (Pullulan)',
    stock: 18,
    size: '120 Vegan Capsules'
  },
  {
    id: 'p4',
    name: 'Rejuvenating Moringa Elixir Facial Oil',
    description: '100% cold-pressed organic Moringa seed oil (Behen oil). A lightweight, high-absorption skincare elixir packed with antioxidant cytokinins, oleic acid, and moisture barriers.',
    price: 29.99,
    rating: 4.9,
    reviewsCount: 78,
    image: '/src/assets/images/moringa_oil_1782131377971.jpg',
    category: 'skincare',
    benefits: [
      'Penetrates deeply without greasy residues to form a locking skin hydration barrier',
      'High Zeatin content helps naturally smooth fine lines and environmental stress',
      'Natural purifying properties help counter clogged facial pores and blemishes'
    ],
    usage: 'Apply 3-4 drops to cleansed, slightly damp face and neck morning and night. Can also be applied to dry hair tips for smooth frizz control.',
    ingredients: '100% Cold-Pressed Organic Moringa stenotepela Seed Oil (Fragrance-free)',
    stock: 12,
    size: '1.0 fl oz (30ml)'
  },
  {
    id: 'p5',
    name: 'Premium Organic Moringa Seeds',
    description: '100% natural, raw triangular Moringa stenotepela seeds harvested from selected mature pods. Rich in oleic acid, dietary fibers, and phytosterols; excellent for planting or supplement intake.',
    price: 12.99,
    rating: 4.8,
    reviewsCount: 64,
    image: '/src/assets/images/moringa_seeds_1782133317750.jpg',
    category: 'seeds',
    benefits: [
      'Rich in phytosterols and protective antioxidants',
      'Perfect for home wellness cultivation or dietary supplement use',
      'Fresh, organic crop dried naturally for maximum seed viability'
    ],
    usage: 'Peel the winged shell to extract the white inner seed kernel. Consume 1-2 kernels daily as a natural tonic with water, or place in soil for planting.',
    ingredients: '100% Organic Raw Moringa stenotepela Seeds',
    stock: 50,
    size: '4.0 oz (~150 seeds)'
  },
  {
    id: 'p6',
    name: 'Pure Cold-Pressed Moringa Seed Oil',
    description: 'Super-grade, extra-virgin edible and topical oil extracted from raw Moringa stenotepela seeds. Golden hues packed with nourishing oleic fatty acids and Behenic acid for comprehensive metabolic and tissue care.',
    price: 34.99,
    rating: 5.0,
    reviewsCount: 42,
    image: '/src/assets/images/moringa_oil_bottle_1782133334714.jpg',
    category: 'oil',
    benefits: [
      'Premium nutrition and multi-purpose botanical nourishment',
      'High concentration of protecting monounsaturated oleic fats',
      'Zero solvents or chemicals used in our pristine direct farm press'
    ],
    usage: 'Use as a finishing culinary oil on salads/soups, or massage a few clean drops onto skin and hair tips.',
    ingredients: '100% Pure Virgin Cold-Pressed Moringa stenotepela Seed Oil',
    stock: 15,
    size: '2.0 fl oz (60ml)'
  }
];

export const MORINGA_BLOGS: BlogArticle[] = [
  {
    id: 'post-1',
    title: 'The Green Duel: Moringa vs. Matcha Superfood Breakdown',
    excerpt: 'Both are vibrant, ground green superfoods claiming the top spot in morning energy rituals. But how do nutrients, antioxidants, and sustained focus compare?',
    content: `For years, Matcha has claimed the throne in the modern green wellness community. However, **Moringa stenotepela**, often referred to as the "Miracle Tree", has Quietly emerged as a formidable plant rival. Let's look at the scientific and nutritional facts.

### 🌟 1. Nutritional Profile Face-Off
While Matcha is fantastic for brain power, Moringa offers a wider array of absolute vitamins and essential minerals:
* **Iron Delivery:** Moringa contains significantly more iron than matcha, making it prime for oxygenation and combating lethargy.
* **Calcium and Fibers:** Moringa leaves contain roughly **4x more calcium** and more digestively active fiber than raw matcha green tea leaves.
* **Protein Purity:** Moringa leaves boast about 25% plant-based protein, including all 9 essential amino acids—extremely rare for a single crop.

### 🔋 2. Energy Mechanics: Caffeine vs. Cellular ATP
Matcha contains caffeine coupled with L-theanine. This creates a slow-release mental focus but still relies on standard chemical stimulation:
* **Moringa is entirely Caffeine-Free.** Its energy boost comes from high-bioavailability iron, co-enzyme active B-vitamins, and magnesium.
* It stimulates **Adenosine Triphosphate (ATP)** production directly at the cellular level, rather than elevating blood pressure or adrenaline. This means a absolute zero chance of a nervous crash, and it can be safely enjoyed in the evening.

### 🧘 3. Cellular Health
Both green powers are loaded with life-supporting pigments and antioxidants:
* Matcha is rich in **ECGC (epigallocatechin gallate)** catechins, famous for thermogenesis and metabolic efficiency.
* Moringa is rich in **Quercetin** (excellent for heart and vascular safety) and **Chlorogenic Acid** (which naturally balances glucose uptake).

### 💡 The final verdict?
Include **Matcha** when you require targeted, crisp cognitive stimulation to crush a heavy workload. Choose **Moringa** when you seek holistic, caffeine-free, whole-body nourishment, metabolic balance, and bone density reinforcement.`,
    image: '/src/assets/images/moringa_tea_1782131336190.jpg',
    author: 'Dr. Evelyn Harris, ND',
    date: 'June 18, 2026',
    readTime: '5 min read',
    category: 'Nutrition',
    tags: ['Superfoods', 'Matcha Comparison', 'Energy Booster']
  },
  {
    id: 'post-2',
    title: 'Modern Culinary Ideas: Integrating Moringa into Everyday Dishes',
    excerpt: 'Think Moringa leaf powder is only meant for bland breakfast smoothies? Learn how to elevate your meals with nutrient-packed, savory moringa recipes.',
    content: `For many new to Moringa leaf powder, its distinctive herbaceous, grass-like taste parameter can sometimes feel intimidating. However, when treated like a premium dried herb or a savory spice, Moringa opens a culinary playground of health.

Here are four simple, scrumptious, and chef-approved ways to blend this miracle leaf into your daily diet without compromising on deliciousness!

### 🍲 1. The Superfood Herbed Vinaigrette
Moringa's leafy notes are perfect for acidic, citrus-focused salad dressings. It pairs beautifully with olive oil and vinegar.

* **Ingredients:**
  * 1/2 cup Organic extra virgin olive oil
  * 3 tbsp Freshly squeezed lemon juice
  * 1 small garlic clove, finely minced
  * 1 tsp **Pure Moringa Leaf Powder**
  * 1/2 tsp Dried oregano
  * Sea salt & cracked black pepper to taste
* **Method:** Combine all elements in a small glass jar, seal, and shake vigorously until emulsified. Drizzle over a crisp Mediterranean or dark kale salad.

### 🥑 2. Creamy Moringa Guacamole
Guacamole's high good-fat profile and acidic lime zest work as a absolute shield for any strong green herbal undertone. It creates a creamy, vitamin-stuffed dip.

* Simply add **1 teaspoon of Moringa powder** to your standard recipe (3 ripe avocados, lime, cilantro, red onion, tomato, and jalapeño). Mesh thoroughly. The creaminess of avocado fats renders the moringa virtually unnoticeable, yet elevates the antioxidant capacity of the dip by 400%.

### 🥣 3. Golden Hour Moringa Lentil Soup
Moringa powder is best added at the very end of cooking to protect heat-sensitive Vitamin C from degrading.

* Cook a robust brown or red lentil soup with cumin, turmeric, spinach, and vegetable broth.
* Turn off the heat. Just before serving, stir in **1-2 tablespoons of Moringa powder** into the hot pot. It deepens the organic green tint and provides a rich, savory depth that perfectly complements warm earthy lentils.

### 🥤 4. The Morning "Green Shield" Smoothie
If you *do* prefer smoothies, matching matters. Moringa pairs incredibly well with sweet tropical fruits.

* **Formula:** 1 cup frozen mango chunks, 1 banana, 1 cup unsweetened almond milk, 1/2 cup spinach, and 1 tsp **Moringa leaf powder**. The raw natural sugars of mango and banana balance the moringa’s high chlorophyll flavor, creating a creamy green elixir.`,
    image: '/src/assets/images/moringa_powder_1782131323402.jpg',
    author: 'Chef Marcus Torres',
    date: 'May 28, 2026',
    readTime: '4 min read',
    category: 'Recipes',
    tags: ['Recipes', 'Healthy Cooking', 'Smoothies']
  },
  {
    id: 'post-3',
    title: 'The Science of Moringa: Understanding Phytohormones and Zeatin',
    excerpt: 'Why is moringa widely praised in prestigious dermatology journals? A deep organic look into Zeatin and botanical moisture structures.',
    content: `Behind Moringa’s reputation as a "miracle plant" lies actual biochemistry. In recent years, premium clinical dermatological research has illuminated its remarkable capacity to support cellular longevity. Central to this power is a rare, hyper-active organic plant growth hormone: **Zeatin**.

### 🌿 What is Zeatin?
Zeatin is part of the **cytokinin** family—a group of natural plant messengers responsible for cellular division, growth, and tissue delay of decay. It keeps leaves green, resilient, and thriving under extreme environmental heat stress.

Moringa stenotepela contains more Zeatin than almost any other plant ever analyzed. It boasts **up to 1,000 times more Zeatin** than other common garden crops.

### ✨ How Zeatin Promotes Youthful Skin
Human skin cells undergo continuous environmental damage from UV radiation, pollution, and oxidation. Zeatin acts as a natural biochemical defense shield:
1. **Accelerated Cell Renewal:** Zeatin enhances the division of new dermal skin cells, assisting in the steady transport of youth-promoting nutrients.
2. **Combating Mitochondrial Fatigue:** It protects vital cellular powerhouses (mitochondria) from stress-induced slowing, maintaining elastic vitality.
3. **Collagen Synthesis:** Stimulates structural proteins to defend the skin matrix, reducing visible depth of dry climate lines.

### 💧 Behenic Acid: The Secret Protective Hydration Barrier
In addition to Zeatin, Moringa seeds are rich in **Behenic Acid** (hence the historical name *Behen Oil*). Behenic acid is a natural fatty acid with an excellent, non-greasy lipid structures:
* Unlike synthetic heavy cosmetic creams, pure moringa seed oil mimics the skin’s native sebum.
* It absorbs immediately, building an transparent, breathable cellular barrier that locks in moisture and fends off micro-dust and soot.

Whether ingested as leaf powder to fight cellular stress internally, or applied topically as a cold-pressed seed elixir, the botanical science confirms Moringa is a masterclass in tissue care.`,
    image: '/src/assets/images/moringa_oil_1782131377971.jpg',
    author: 'Sylvia Chen, Clinical Dermatologist',
    date: 'April 14, 2026',
    readTime: '6 min read',
    category: 'Wellness',
    tags: ['Phytohormones', 'Skincare Science', 'Anti-Aging']
  }
];
