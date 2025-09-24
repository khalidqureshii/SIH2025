// import type { CropDataType } from "@/components/cropTimeLine/types";

// const cropData: CropDataType = {
//     maize: {
//       name: "Maize",
//       growthPeriod: "90-120 days",
//       timeline: [
//         {
//           stage: "Soil Preparation",
//           duration: "10-15 days",
//           resources: {
//             labor: "1-2 workers per acre",
//             water: "Minimal",
//             equipment: "Plow, harrow, tractor",
//             fertilizer: "15-20 kg NPK per acre",
//           },
//           scalableResources: { labor: [1, 2], fertilizer: [15, 20] },
//           temperature: "15-25°C",
//           description: "Prepare the soil by plowing and harrowing to create a fine seedbed."
//         },
//         {
//           stage: "Emergence",
//           duration: "4-10 days",
//           resources: {
//             labor: "1 worker per acre",
//             water: "Moderate irrigation",
//             equipment: "Planter",
//             fertilizer: "5-10 kg N per acre",
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
//           temperature: "20-30°C",
//           description: "Ensure consistent moisture for seed germination and early growth."
//         },
//         {
//           stage: "Weaning (4-5 leaf)",
//           duration: "14-21 days",
//           resources: {
//             labor: "1-2 workers",
//             water: "Regular irrigation",
//             equipment: "Sprayers",
//             fertilizer: "10-15 kg P per acre",
//           },
//           scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
//           temperature: "25-35°C",
//           description: "Maintain soil moisture and apply phosphorus to support root development."
//         },
//         {
//           stage: "Tassel Visible",
//           duration: "7-10 days",
//           resources: {
//             labor: "2 workers",
//             water: "Heavy irrigation",
//             equipment: "Fertilizer applicator",
//             fertilizer: "20-25 kg N per acre",
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
//           temperature: "25-30°C",
//           description: "Increase nitrogen application to support rapid vegetative growth."
//         },
//         {
//           stage: "Grain Maturation",
//           duration: "30-40 days",
//           resources: {
//             labor: "1 worker",
//             water: "Reduced irrigation",
//             equipment: "Moisture meter",
//             fertilizer: "5-10 kg K per acre",
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
//           temperature: "20-25°C",
//           description: "Gradually reduce irrigation to allow grains to mature and harden."
//         },
//       ],
//     },
//     potatoes: {
//       name: "Potatoes",
//       growthPeriod: "80-100 days",
//       timeline: [
//         {
//           stage: "Sprout Development",
//           duration: "2-6 weeks",
//           resources: {
//             labor: "2-3 workers",
//             water: "Moderate",
//             equipment: "Planter",
//             fertilizer: "10-15 kg/acre",
//           },
//           scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
//           temperature: "15-20°C",
//           description: "Ensure soil temperature is optimal for sprout emergence."
//         },
//         {
//           stage: "Vegetative Growth",
//           duration: "4-5 weeks",
//           resources: {
//             labor: "2 workers",
//             water: "Regular irrigation",
//             equipment: "Cultivator",
//             fertilizer: "15-20 kg NPK",
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
//           temperature: "18-25°C",
//           description: "Maintain consistent moisture and nutrient levels for healthy foliage development."
//         },
//         {
//           stage: "Tuber Formation",
//           duration: "5-6 weeks",
//           resources: {
//             labor: "3 workers",
//             water: "Heavy irrigation",
//             equipment: "Hillers",
//             fertilizer: "20-25 kg K per acre",
//           },
//           scalableResources: { labor: [3, 3], fertilizer: [20, 25] },
//           temperature: "15-20°C",
//           description: "Increase potassium application to support tuber development."
//         },
//         {
//           stage: "Tuber Bulking",
//           duration: "4-5 weeks",
//           resources: {
//             labor: "2 workers",
//             water: "Controlled irrigation",
//             equipment: "Moisture sensors",
//             fertilizer: "10-15 kg P per acre",
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
//           temperature: "16-22°C",
//           description : "Monitor soil moisture closely to prevent water stress during tuber bulking."
//         },
//       ],
//     },
//     "rice (paddy)": {
//       name: "Rice (Paddy)",
//       growthPeriod: "120-150 days",
//       timeline: [
//         {
//           stage: "Land Preparation",
//           duration: "15-20 days",
//           resources: {
//             labor: "3-4 workers",
//             water: "Flooding required",
//             equipment: "Puddler",
//             fertilizer: "15-20 kg/acre",
//           },
//           scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
//           temperature: "20-30°C",
//           description: "Prepare the field by puddling to create a suitable environment for rice transplantation."
//         },
//         {
//           stage: "Vegetative Phase",
//           duration: "40-50 days",
//           resources: {
//             labor: "4 workers",
//             water: "Continuous flooding",
//             equipment: "Transplanter",
//             fertilizer: "25-30 kg N per acre",
//           },
//           scalableResources: { labor: [4, 4], fertilizer: [25, 30] },
//           temperature: "25-35°C",
//           description: "Maintain continuous flooding to support healthy plant growth."
//         },
//         {
//           stage: "Reproductive Phase",
//           duration: "30-35 days",
//           resources: {
//             labor: "3 workers",
//             water: "Controlled drainage",
//             equipment: "Sprayers",
//             fertilizer: "15-20 kg P per acre",
//           },
//           scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
//           temperature: "28-32°C",
//           description: "Implement controlled drainage to optimize water use during flowering and grain filling."
//         },
//         {
//           stage: "Ripening Phase",
//           duration: "25-30 days",
//           resources: {
//             labor: "2 workers",
//             water: "Field drying",
//             equipment: "Combine harvester",
//             fertilizer: "10-15 kg K per acre",
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
//           temperature: "20-25°C",
//           description: "Allow the field to dry before harvesting to ensure optimal grain quality."
//         },
//       ],
//     },
//     sorghum: {
//       name: "Sorghum",
//       growthPeriod: "100-130 days",
//       timeline: [
//         {
//           stage: "Seedling Emergence",
//           duration: "3-14 days",
//           resources: {
//             labor: "1-2 workers",
//             water: "Light irrigation",
//             equipment: "Planter",
//             fertilizer: "10-15 kg/acre",
//           },
//           scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
//           temperature: "20-30°C",
//           description: "Ensure soil moisture is adequate for seed germination."
//         },
//         {
//           stage: "Tillering",
//           duration: "20-25 days",
//           resources: {
//             labor: "2 workers",
//             water: "Moderate irrigation",
//             equipment: "Cultivator",
//             fertilizer: "15-20 kg N per acre",
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
//           temperature: "25-35°C",
//           description: "Maintain consistent moisture and nutrient levels for healthy tiller development."
//         },
//         {
//           stage: "Stem Elongation",
//           duration: "25-30 days",
//           resources: {
//             labor: "3 workers",
//             water: "Regular irrigation",
//             equipment: "Sprayers",
//             fertilizer: "20-25 kg NPK per acre",
//           },
//           scalableResources: { labor: [3, 3], fertilizer: [20, 25] },
//           temperature: "25-30°C",
//           description: "Increase nitrogen application to support rapid stem growth."
//         },
//         {
//           stage: "Grain Maturation",
//           duration: "30-40 days",
//           resources: {
//             labor: "1 worker",
//             water: "Reduced irrigation",
//             equipment: "Combine harvester",
//             fertilizer: "5-10 kg K per acre",
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
//           temperature: "20-25°C",
//           description: "Gradually reduce irrigation to allow grains to mature and harden."
//         },
//       ],
//     },
//     soybeans: {
//       name: "Soybeans",
//       growthPeriod: "80-120 days",
//       timeline: [
//         {
//           stage: "Seed Treatment",
//           duration: "1-2 days",
//           resources: {
//             labor: "1 worker per acre",
//             water: "Light irrigation",
//             equipment: "Seed treater",
//             fertilizer: "5-10 kg inoculant per acre"
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
//           temperature: "20-25°C",
//           description: "Treat seeds with inoculants to enhance nitrogen fixation."
//         },
//         {
//           stage: "Germination",
//           duration: "5-10 days",
//           resources: {
//             labor: "1 worker",
//             water: "Moderate irrigation",
//             equipment: "Planter",
//             fertilizer: "10-15 kg N per acre"
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
//           temperature: "25-30°C",
//           description: "Ensure consistent moisture for seed germination and early growth."
//         },
//         {
//           stage: "Vegetative Growth",
//           duration: "30-40 days",
//           resources: {
//             labor: "2 workers",
//             water: "Regular irrigation",
//             equipment: "Sprayers",
//             fertilizer: "15-20 kg P per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
//           temperature: "25-35°C",
//           description: "Maintain soil moisture and apply phosphorus to support healthy vegetative growth."
//         },
//         {
//           stage: "Pod Formation",
//           duration: "25-35 days",
//           resources: {
//             labor: "2 workers",
//             water: "Controlled irrigation",
//             equipment: "Moisture sensors",
//             fertilizer: "10-15 kg K per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
//           temperature: "20-30°C",
//           description: "Monitor soil moisture closely to prevent water stress during pod formation."
//         }
//       ]
//     },
//     wheat: {
//       name: "Wheat",
//       growthPeriod: "120-150 days",
//       timeline: [
//         {
//           stage: "Seedbed Preparation",
//           duration: "10-15 days",
//           resources: {
//             labor: "2-3 workers",
//             water: "Light irrigation",
//             equipment: "Plow, harrow",
//             fertilizer: "15-20 kg DAP per acre"
//           },
//           scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
//           temperature: "15-20°C",
//           description: "Prepare a fine seedbed to ensure good seed-to-soil contact."
//         },
//         {
//           stage: "Tillering",
//           duration: "30-40 days",
//           resources: {
//             labor: "2 workers",
//             water: "Moderate irrigation",
//             equipment: "Sprayers",
//             fertilizer: "20-25 kg N per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
//           temperature: "18-25°C",
//           description: "Maintain consistent moisture and nutrient levels for healthy tiller development."
//         },
//         {
//           stage: "Stem Extension",
//           duration: "25-30 days",
//           resources: {
//             labor: "3 workers",
//             water: "Regular irrigation",
//             equipment: "Fertilizer applicator",
//             fertilizer: "15-20 kg NPK per acre"
//           },
//           scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
//           temperature: "20-28°C",
//           description: "Increase nitrogen application to support rapid stem growth."
//         },
//         {
//           stage: "Grain Filling",
//           duration: "35-45 days",
//           resources: {
//             labor: "1 worker",
//             water: "Reduced irrigation",
//             equipment: "Combine harvester",
//             fertilizer: "5-10 kg K per acre"
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
//           temperature: "15-22°C",
//           description: "Gradually reduce irrigation to allow grains to mature and harden."
//         }
//       ]
//     },
//     cassava: {
//       name: "Cassava",
//       growthPeriod: "8-18 months",
//       timeline: [
//         {
//           stage: "Stem Selection",
//           duration: "5-7 days",
//           resources: {
//             labor: "2 workers",
//             water: "Light irrigation",
//             equipment: "Cutting tools",
//             fertilizer: "10-15 kg NPK per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
//           temperature: "25-30°C",
//           description: "Select healthy stems for planting to ensure good crop establishment."
//         },
//         {
//           stage: "Planting",
//           duration: "10-15 days",
//           resources: {
//             labor: "3-4 workers",
//             water: "Moderate irrigation",
//             equipment: "Planting sticks",
//             fertilizer: "15-20 kg N per acre"
//           },
//           scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
//           temperature: "27-35°C",
//           description: "Ensure proper planting depth and spacing for optimal growth."
//         },
//         {
//           stage: "Vegetative Growth",
//           duration: "4-6 months",
//           resources: {
//             labor: "2 workers",
//             water: "Regular irrigation",
//             equipment: "Weeders",
//             fertilizer: "20-25 kg P per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
//           temperature: "25-35°C",
//           description: "Maintain soil moisture and apply phosphorus to support healthy vegetative growth."
//         },
//         {
//           stage: "Tuber Bulking",
//           duration: "3-5 months",
//           resources: {
//             labor: "3 workers",
//             water: "Controlled irrigation",
//             equipment: "Moisture meters",
//             fertilizer: "15-20 kg K per acre"
//           },
//           scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
//           temperature: "25-32°C",
//           description: "Monitor soil moisture closely to prevent water stress during tuber bulking."
//         }
//       ]
//     },
//     "sweet potatoes": {
//       name: "Sweet Potatoes",
//       growthPeriod: "90-150 days",
//       timeline: [
//         {
//           stage: "Vine Preparation",
//           duration: "10-15 days",
//           resources: {
//             labor: "2 workers",
//             water: "Moderate irrigation",
//             equipment: "Cutting tools",
//             fertilizer: "10-15 kg NPK per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
//           temperature: "25-30°C",
//           description: "Prepare healthy vine cuttings for planting to ensure good crop establishment."
//         },
//         {
//           stage: "Planting",
//           duration: "5-7 days",
//           resources: {
//             labor: "3-4 workers",
//             water: "Regular irrigation",
//             equipment: "Planting machine",
//             fertilizer: "15-20 kg N per acre"
//           },
//           scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
//           temperature: "27-35°C",
//           description: "Ensure proper planting depth and spacing for optimal growth."
//         },
//         {
//           stage: "Vine Development",
//           duration: "40-60 days",
//           resources: {
//             labor: "2 workers",
//             water: "Controlled irrigation",
//             equipment: "Sprayers",
//             fertilizer: "20-25 kg P per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
//           temperature: "25-32°C",
//           description: "Maintain soil moisture and apply phosphorus to support healthy vine growth."
//         },
//         {
//           stage: "Tuber Formation",
//           duration: "50-70 days",
//           resources: {
//             labor: "1 worker",
//             water: "Reduced irrigation",
//             equipment: "Moisture sensors",
//             fertilizer: "10-15 kg K per acre"
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
//           temperature: "20-28°C",
//           description: "Monitor soil moisture closely to prevent water stress during tuber formation."
//         }
//       ]
//     },
//     "plantains & others": {
//       name: "Plantains & Others",
//       growthPeriod: "9-12 months",
//       timeline: [
//         {
//           stage: "Sucker Selection",
//           duration: "10-15 days",
//           resources: {
//             labor: "2 workers",
//             water: "Moderate irrigation",
//             equipment: "Cutting tools",
//             fertilizer: "15-20 kg NPK per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
//           temperature: "25-30°C",
//           description: "Select healthy suckers for planting to ensure good crop establishment."
//         },
//         {
//           stage: "Planting",
//           duration: "15-20 days",
//           resources: {
//             labor: "3-4 workers",
//             water: "Heavy irrigation",
//             equipment: "Digging tools",
//             fertilizer: "20-25 kg N per acre"
//           },
//           scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
//           temperature: "27-35°C",
//           description: "Ensure proper planting depth and spacing for optimal growth."
//         },
//         {
//           stage: "Vegetative Growth",
//           duration: "5-7 months",
//           resources: {
//             labor: "2 workers",
//             water: "Regular irrigation",
//             equipment: "Pruning tools",
//             fertilizer: "25-30 kg P per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [25, 30] },
//           temperature: "25-35°C",
//           description: "Maintain soil moisture and apply phosphorus to support healthy vegetative growth."
//         },
//         {
//           stage: "Bunch Development",
//           duration: "3-4 months",
//           resources: {
//             labor: "3 workers",
//             water: "Controlled irrigation",
//             equipment: "Support poles",
//             fertilizer: "15-20 kg K per acre"
//           },
//           scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
//           temperature: "25-32°C",
//           description: "Monitor soil moisture closely to prevent water stress during bunch development."
//         }
//       ]
//     },
//     yams: {
//       name: "Yams",
//       growthPeriod: "8-12 months",
//       timeline: [
//         {
//           stage: "Seed Yam Preparation",
//           duration: "15-20 days",
//           resources: {
//             labor: "2 workers",
//             water: "Light irrigation",
//             equipment: "Cutting tools",
//             fertilizer: "10-15 kg NPK per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
//           temperature: "25-30°C",
//           description: "Prepare healthy seed yams for planting to ensure good crop establishment."
//         },
//         {
//           stage: "Planting",
//           duration: "10-15 days",
//           resources: {
//             labor: "3-4 workers",
//             water: "Moderate irrigation",
//             equipment: "Digging tools",
//             fertilizer: "20-25 kg N per acre"
//           },
//           scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
//           temperature: "27-35°C",
//           description: "Ensure proper planting depth and spacing for optimal growth."
//         },
//         {
//           stage: "Vine Training",
//           duration: "2-3 months",
//           resources: {
//             labor: "2 workers",
//             water: "Regular irrigation",
//             equipment: "Support trellis",
//             fertilizer: "15-20 kg P per acre"
//           },
//           scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
//           temperature: "25-32°C",
//           description: "Train vines to grow on the trellis for better sunlight exposure."
//         },
//         {
//           stage: "Tuber Maturation",
//           duration: "4-6 months",
//           resources: {
//             labor: "1 worker",
//             water: "Reduced irrigation",
//             equipment: "Moisture meters",
//             fertilizer: "10-15 kg K per acre"
//           },
//           scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
//           temperature: "20-28°C",
//           description: "Monitor soil moisture closely to prevent water stress during tuber maturation."
//         }
//       ]
//     }
//   };

//   export default cropData;



import type { CropDataType } from "@/components/cropTimeLine/types";

const cropData: CropDataType = {
  maize: {
    name: "Maize",
    growthPeriod: "90-120 days",
    soil_preference: "Well-drained loam; slightly acidic to neutral (pH ~5.5-7.0)",
    timeline: [
      {
        stage: "Soil Preparation",
        duration: "10-15 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Minimal (just to get workable moisture)",
          equipment: "Plow/harrow or hand hoes",
          fertilizer: "Basal: 15-20 kg Nitrogen mix per acre (split as needed)",
        },
        scalableResources: { labor: [1, 2], fertilizer: [15, 20] },
        temperature: "15-25°C",
        description: "Make a fine, level seedbed by plowing and harrowing so seeds contact soil well.",
        what_to_do:
          "Plow once or twice to break up clods, harrow to make a fine tilth, level the field, and apply the basal (first) fertilizer evenly before final levelling.",
        tips:
          "Work soil when it is slightly moist — not too wet (that compacts) and not too dry (that creates dust).",
        indicators: "Soil crumbles into small pieces and feels loose. No big clods remain.",
        pests_and_diseases: [
          { name: "Rodents/birds", control: "Keep field clean; light guarding after sowing" }
        ],
      },
      {
        stage: "Emergence",
        duration: "4-10 days",
        resources: {
          labor: "1 worker per acre",
          water: "Moderate irrigation until emergence",
          equipment: "Seed drill or hand broadcasting followed by light raking",
          fertilizer: "Light starter: 5-10 kg Nitrogen per acre",
        },
        scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
        temperature: "20-30°C",
        description: "Keep the seedbed lightly moist to allow seeds to germinate and sprout uniformly.",
        what_to_do:
          "Irrigate lightly if dry; check rows for uniform emergence; thin or replant gaps if many seeds fail.",
        tips: "Avoid overwatering — it causes seed rot. Protect from birds by light netting or guarding.",
        indicators: "Green shoots through soil, uniform rows; 80%+ emergence is good.",
        pests_and_diseases: [
          { name: "Damping-off (fungal)", control: "Avoid waterlogged seedbeds; good seed-to-soil contact and seed treatment helps" }
        ],
      },
      {
        stage: "Weaning (4-5 leaf)",
        duration: "14-21 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Regular irrigation as needed",
          equipment: "Sprayers for fertilizer or minor sprays",
          fertilizer: "10-15 kg Phosphorus per acre (if soil needs it)",
        },
        scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
        temperature: "25-35°C",
        description: "Support root growth and early vegetative growth with phosphorus and regular moisture.",
        what_to_do:
          "Apply phosphorus if recommended by soil test, weed the rows, keep even moisture, and check for pests.",
        tips:
          "Hand-weed or use light cultivation to avoid competition. Use organic mulch if available to conserve moisture.",
        indicators: "Plants have 4–5 leaves and look green and steady (not wilting).",
        pests_and_diseases: [
          { name: "Armyworm", control: "Handpick when small or apply low-toxicity options; monitor regularly" }
        ],
      },
      {
        stage: "Tassel Visible",
        duration: "7-10 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Heavier irrigation during rapid growth (but avoid waterlogging)",
          equipment: "Spreader or applicator if applying top dress fertilizer",
          fertilizer: "Top-dress Nitrogen 20-25 kg per acre",
        },
        scalableResources: { labor: [2, 3], fertilizer: [20, 25] },
        temperature: "25-30°C",
        description: "High nutrient demand stage — support with nitrogen to increase biomass and grain set.",
        what_to_do:
          "Top-dress nitrogen as split dose, ensure steady watering, and scout for pests and diseases.",
        tips:
          "Avoid applying very heavy nitrogen at once — split doses give steady growth and reduce lodging.",
        indicators: "Tassels appear at plant top; healthy green leaves and sturdy stems.",
        pests_and_diseases: [
          { name: "Stem borers, armyworm", control: "Monitor; remove affected plants and consider targeted control" }
        ],
      },
      {
        stage: "Grain Maturation",
        duration: "30-40 days",
        resources: {
          labor: "1 worker per acre",
          water: "Reduce irrigation gradually",
          equipment: "Moisture meter (optional) or observe kernels",
          fertilizer: "Light potassium 5-10 kg per acre if needed",
        },
        scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
        temperature: "20-25°C",
        description: "Allow the grain to fill and dry; reduce watering before harvest so grains harden.",
        what_to_do:
          "Reduce irrigation slowly, monitor grain moisture; prepare for harvest when kernels are firm and moisture is low.",
        tips:
          "Do not harvest too early — yields and grain quality drop. Use a moisture meter or wait until black layer forms.",
        indicators: "Kernels are firm and dented; plant leaves start drying at the top.",
        pests_and_diseases: [
          { name: "Storage pests (post-harvest)", control: "Dry well before storage; clean storage area; use airtight containers where possible" }
        ],
        harvest_notes: "Harvest when grain moisture is ~20% or lower; dry to ~12-14% for safe storage."
      }
    ]
  },

  potatoes: {
    name: "Potatoes",
    growthPeriod: "80-100 days",
    soil_preference: "Loose, well-drained loam; avoid waterlogging; slightly acidic preferred",
    timeline: [
      {
        stage: "Sprout Development",
        duration: "2-6 weeks",
        resources: {
          labor: "2-4 workers per acre",
          water: "Moderate moisture",
          equipment: "Planter or hand-planting tools",
          fertilizer: "10-15 kg balanced fertilizer per acre at planting",
        },
        scalableResources: { labor: [2, 4], fertilizer: [10, 15] },
        temperature: "15-20°C",
        description: "Ensure seed pieces sprout well before they use lots of energy — keep soil moist and warm.",
        what_to_do:
          "Use healthy seed pieces, plant at correct depth, hill rows lightly, and keep soil moist for sprouting.",
        tips:
          "Chit (pre-sprout) seed pieces before planting to encourage uniform emergence.",
        indicators: "Sprouts appear from seed pieces uniformly across rows.",
        pests_and_diseases: [
          { name: "Cutworms/aphids", control: "Hand removal or light insecticide; keep field edges clear" }
        ],
      },
      {
        stage: "Vegetative Growth",
        duration: "4-5 weeks",
        resources: {
          labor: "2-3 workers per acre",
          water: "Regular irrigation",
          equipment: "Cultivator/weeder",
          fertilizer: "15-20 kg Nitrogen per acre split across early growth",
        },
        scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
        temperature: "18-25°C",
        description: "Encourage strong foliage for later tuber formation; manage weeds and water.",
        what_to_do:
          "Keep weeds under control, maintain even moisture, apply fertilizer as needed, and hill soil around stems if needed.",
        tips: "Avoid overwatering which causes rotting; ensure good drainage.",
        indicators: "Healthy green foliage and no wilting; rows are clean of weeds.",
        pests_and_diseases: [
          { name: "Late blight", control: "Use resistant varieties; apply fungicide when conditions are wet" }
        ],
      },
      {
        stage: "Tuber Formation",
        duration: "5-6 weeks",
        resources: {
          labor: "3-4 workers per acre",
          water: "Higher water needs during tuber set",
          equipment: "Hillers or manual earthing up",
          fertilizer: "20-25 kg Potassium per acre to support tubers",
        },
        scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
        temperature: "15-20°C",
        description: "This is when tubers start forming — steady water and potassium help good tuber set.",
        what_to_do:
          "Keep even soil moisture, apply potassium if recommended, hill up soil to protect tubers from sunlight.",
        tips: "Avoid heavy nitrogen late — makes foliage not tubers.",
        indicators: "Plants show swelling at soil line and small tubers if you dig one up carefully.",
        pests_and_diseases: [
          { name: "Wireworms/white grubs", control: "Crop rotation; avoid planting in infested fields" }
        ],
      },
      {
        stage: "Tuber Bulking",
        duration: "4-5 weeks",
        resources: {
          labor: "2-3 workers per acre",
          water: "Controlled irrigation—do not water excessively close to harvest",
          equipment: "Moisture probe (optional)",
          fertilizer: "10-15 kg Phosphorus per acre if soil is low",
        },
        scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
        temperature: "16-22°C",
        description: "Increase tuber size by keeping steady water and nutrients, then reduce water before harvest.",
        what_to_do:
          "Manage irrigation to avoid cracking, test tuber size by digging sample plants, and reduce water as crop nears maturity.",
        tips: "Avoid too much nitrogen during bulking; it reduces tuber quality.",
        indicators: "Tuber size increases; foliage starts showing first signs of yellowing when near maturity.",
        pests_and_diseases: [
          { name: "Scab", control: "Maintain slightly acidic soil; avoid excess lime; crop rotation" }
        ],
        harvest_notes: "Harvest when foliage dies back and tubers have firm skin."
      }
    ]
  },

  "rice (paddy)": {
    name: "Rice (Paddy)",
    growthPeriod: "120-150 days",
    soil_preference: "Clayey loam that can hold water; lowland puddled fields for transplanted rice",
    timeline: [
      {
        stage: "Land Preparation",
        duration: "15-20 days",
        resources: {
          labor: "3-5 workers per acre",
          water: "Flooding/puddling required for transplanted rice",
          equipment: "Puddler/rotavator or manual puddling tools",
          fertilizer: "15-20 kg balanced per acre at field prep",
        },
        scalableResources: { labor: [3, 5], fertilizer: [15, 20] },
        temperature: "20-30°C",
        description: "Make flat, puddled beds for transplanting; this helps water retention and weakens weeds.",
        what_to_do:
          "Flood and puddle field to make a soft, level bed; remove stubbles and large debris; apply basal fertilizer if needed.",
        tips: "Ensure correct puddling depth so seedlings can be transplanted easily.",
        indicators: "Field is level and holds shallow water uniformly.",
        pests_and_diseases: [
          { name: "Snails/rodents", control: "Field sanitation and early guarding; maintain clean bunds" }
        ],
      },
      {
        stage: "Vegetative Phase",
        duration: "40-50 days",
        resources: {
          labor: "4-6 workers per acre",
          water: "Continuous shallow flooding for transplanted rice",
          equipment: "Transplanter or manual transplant tools",
          fertilizer: "25-30 kg Nitrogen per acre in split doses",
        },
        scalableResources: { labor: [4, 6], fertilizer: [25, 30] },
        temperature: "25-35°C",
        description: "Plants grow leaves and tillers — steady water and nitrogen support healthy growth.",
        what_to_do:
          "Transplant seedlings at correct spacing, keep uniform water depth, top-dress nitrogen in splits and remove weeds.",
        tips: "Do not let field dry out suddenly; keep small water depth (~2-5 cm) depending on stage.",
        indicators: "Good tiller numbers and vigorous green plants.",
        pests_and_diseases: [
          { name: "Brown planthopper, rice blast", control: "Use resistant variety and avoid excessive nitrogen; apply local recommended control" }
        ],
      },
      {
        stage: "Reproductive Phase",
        duration: "30-35 days",
        resources: {
          labor: "3-4 workers per acre",
          water: "Controlled drainage around flowering (avoid extreme stress)",
          equipment: "Sprayers for foliar applications",
          fertilizer: "15-20 kg Phosphorus per acre if needed",
        },
        scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
        temperature: "28-32°C",
        description: "Flowering and grain formation — water and nutrient balance essential to avoid sterility or shattering.",
        what_to_do:
          "Manage water carefully, protect from pests during flowering, and avoid extreme heat or drought.",
        tips: "Avoid heavy machinery during this phase to prevent lodging.",
        indicators: "Panicles are formed and flowering occurs; grains start to set.",
        pests_and_diseases: [
          { name: "Rice blast, sheath blight", control: "Apply recommended fungicides; sanitation and resistant varieties help" }
        ],
      },
      {
        stage: "Ripening Phase",
        duration: "25-30 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Field drying prior to harvest",
          equipment: "Combine harvester or sickles",
          fertilizer: "Low potassium as needed (10-15 kg K per acre)",
        },
        scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
        temperature: "20-25°C",
        description: "Allow grain to mature and dry in the field before harvest to ensure quality.",
        what_to_do:
          "Stop irrigation to allow fields to dry, check grain moisture, and prepare for harvest when grains are hard.",
        tips: "If rain is expected, consider earlier harvest and drying under cover.",
        indicators: "Grains are firm, and stems start to yellow and dry.",
        pests_and_diseases: [
          { name: "Birds/rodents at harvest", control: "Harvest promptly and store safely" }
        ],
        harvest_notes: "Harvest when grain moisture is appropriate; sun-dry if needed and store in dry sacks."
      }
    ]
  },

  sorghum: {
    name: "Sorghum",
    growthPeriod: "100-130 days",
    soil_preference: "Well-drained soils; tolerates poorer soils better than many cereals",
    timeline: [
      {
        stage: "Seedling Emergence",
        duration: "3-14 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Light irrigation until emergence",
          equipment: "Planter or hand sowing",
          fertilizer: "10-15 kg balanced fertilizer per acre at sowing",
        },
        scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
        temperature: "20-30°C",
        description: "Keep seedbed moist but not waterlogged for even germination.",
        what_to_do: "Sow at correct depth, keep soil moist, and thin weak plants or re-sow gaps.",
        tips: "Sorghum seeds are hardy — but keep birds and rodents away after sowing.",
        indicators: "Uniform seedlings 7–14 days after sowing.",
        pests_and_diseases: [
          { name: "Birds", control: "Use scarecrow or netting; plant when birds are less active if possible" }
        ],
      },
      {
        stage: "Tillering",
        duration: "20-25 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Moderate irrigation",
          equipment: "Weeder/cultivator",
          fertilizer: "15-20 kg Nitrogen per acre",
        },
        scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
        temperature: "25-35°C",
        description: "Tillers (side shoots) form — keep nutrients and water steady so they develop fully.",
        what_to_do: "Remove weeds, give top-dress nitrogen if needed, and maintain moisture.",
        tips: "Sorghum can handle dry spells better than maize — but yields will fall if too dry at tillering.",
        indicators: "Multiple tillers per plant and steady green foliage.",
        pests_and_diseases: [{ name: "Shoot fly", control: "Crop rotation and timely sowing" }],
      },
      {
        stage: "Stem Elongation",
        duration: "25-30 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Regular irrigation if possible",
          equipment: "Sprayers for nutrients/pest checks",
          fertilizer: "20-25 kg NPK per acre",
        },
        scalableResources: { labor: [2, 3], fertilizer: [20, 25] },
        temperature: "25-30°C",
        description: "Rapid height growth; support with nitrogen and water.",
        what_to_do: "Monitor for lodging (plants falling over) and pests; top up fertilizer if needed.",
        tips: "Avoid heavy nitrogen late which may cause lodging.",
        indicators: "Stems elongate and head formation starts later.",
        pests_and_diseases: [{ name: "Stem borer", control: "Monitor and remove affected plants; timely control measures" }],
      },
      {
        stage: "Grain Maturation",
        duration: "30-40 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Reduce irrigation as grains fill",
          equipment: "Combine or sickles",
          fertilizer: "5-10 kg Potassium if soil low",
        },
        scalableResources: { labor: [1, 2], fertilizer: [5, 10] },
        temperature: "20-25°C",
        description: "Dry down grains and harvest at the right time to avoid losses.",
        what_to_do:
          "Allow crops to mature, reduce watering gradually, harvest when grains are hard, and dry well before storage.",
        tips: "Sorghum stores well when dry and clean.",
        indicators: "Grains are hard and heads dry; stems yellow.",
        pests_and_diseases: [{ name: "Birds at harvest", control: "Harvest promptly and store safely" }],
      }
    ]
  },

  soybeans: {
    name: "Soybeans",
    growthPeriod: "80-120 days",
    soil_preference: "Well-drained loam; neutral pH preferred; do not waterlog",
    timeline: [
      {
        stage: "Seed Treatment",
        duration: "1-2 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Light",
          equipment: "Seed treater or simple soaking setup",
          fertilizer: "Seed inoculant (biological) 5-10 kg equivalent per acre (if not used before)",
        },
        scalableResources: { labor: [1, 2], fertilizer: [5, 10] },
        temperature: "20-25°C",
        description: "Treat seeds to help nitrogen-fixing bacteria establish and improve early growth.",
        what_to_do: "Coat seeds with inoculant if not previously used on field; plant at correct depth.",
        tips: "Use fresh inoculant and avoid chemical seed treatments that kill the bacteria.",
        indicators: "Good uniform germination and later nodules on roots if inspected.",
        pests_and_diseases: [{ name: "Seed rots", control: "Avoid waterlogging and use good seed" }],
      },
      {
        stage: "Germination",
        duration: "5-10 days",
        resources: {
          labor: "1 worker per acre",
          water: "Moderate",
          equipment: "Planter",
          fertilizer: "10-15 kg Nitrogen if soil low (often not needed if inoculated)",
        },
        scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
        temperature: "25-30°C",
        description: "Keep moisture steady to support sprouting and root nodule formation.",
        what_to_do: "Irrigate lightly if dry, avoid overwatering, and check for even rows.",
        tips: "If soil fertility is poor, small starter fertilizer helps.",
        indicators: "Uniform rows of seedlings and healthy leaf color.",
        pests_and_diseases: [{ name: "Aphids", control: "Monitor and use low-toxicity controls if necessary" }],
      },
      {
        stage: "Vegetative Growth",
        duration: "30-40 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Regular irrigation",
          equipment: "Sprayers for nutrients/pest control",
          fertilizer: "15-20 kg Phosphorus per acre if soil low",
        },
        scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
        temperature: "25-35°C",
        description: "Plants develop leaves and roots; proper nutrition builds yield potential.",
        what_to_do: "Apply needed fertilizer, manage weeds, and check for pests; encourage healthy nodulation.",
        tips: "Soybeans fix nitrogen; avoid excess nitrogen fertilizer as it can reduce fixation.",
        indicators: "Vigorous leaf growth and good plant stand.",
        pests_and_diseases: [{ name: "Pod borer/aphids", control: "Monitor/trap and use recommended sprays" }],
      },
      {
        stage: "Pod Formation",
        duration: "25-35 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Controlled irrigation to keep pods forming",
          equipment: "Moisture sensors optional",
          fertilizer: "10-15 kg Potassium per acre if soil low",
        },
        scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
        temperature: "20-30°C",
        description: "Pods form and fill — keep moisture steady and avoid stress.",
        what_to_do: "Make sure plants have enough moisture and nutrients, and harvest when pods are mature and dry.",
        tips: "Avoid late drought; it reduces pod fill and yield.",
        indicators: "Pods plumpen and dry color appears before harvest.",
        pests_and_diseases: [{ name: "Pod thrips", control: "Monitor and take action if high numbers" }],
        harvest_notes: "Harvest when pods are dry to avoid losses; dry seeds before storage."
      }
    ]
  },

  wheat: {
    name: "Wheat",
    growthPeriod: "120-150 days",
    soil_preference: "Well-drained loam; neutral to slightly alkaline soils",
    timeline: [
      {
        stage: "Seedbed Preparation",
        duration: "10-15 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Light for seedbed if dry",
          equipment: "Plow/harrow, leveling tools",
          fertilizer: "15-20 kg starter fertilizer per acre",
        },
        scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
        temperature: "15-20°C",
        description: "Create a fine, firm seedbed for even germination and seeding depth.",
        what_to_do: "Plow/harrow, level, remove big clods and stones, and apply starter fertilizer if needed.",
        tips: "Firm seedbed ensures better seed-to-soil contact and even germination.",
        indicators: "Fine tilth and firm surface for sowing.",
      },
      {
        stage: "Tillering",
        duration: "30-40 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Moderate irrigation",
          equipment: "Weeder/sprayer",
          fertilizer: "20-25 kg Nitrogen per acre top-dress",
        },
        scalableResources: { labor: [2, 3], fertilizer: [20, 25] },
        temperature: "18-25°C",
        description: "Plants form tillers — more tillers generally mean more heads and yield potential.",
        what_to_do: "Top-dress nitrogen if required and keep fields weed-free.",
        tips: "Do not delay fertilizer — timely application supports tiller survival.",
        indicators: "Multiple stems per plant and healthy green leaves.",
      },
      {
        stage: "Stem Extension",
        duration: "25-30 days",
        resources: {
          labor: "3-4 workers per acre",
          water: "Regular irrigation during growth",
          equipment: "Fertilizer applicator if needed",
          fertilizer: "15-20 kg NPK per acre",
        },
        scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
        temperature: "20-28°C",
        description: "Rapid growth before heading — nutrition and water are important.",
        what_to_do: "Monitor for pests and diseases, top up nutrients if needed, and avoid lodging by controlling excessive nitrogen.",
        tips: "Good drainage prevents waterlogging and root problems.",
        indicators: "Stems lengthen and head formation begins.",
      },
      {
        stage: "Grain Filling",
        duration: "35-45 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Reduce irrigation gradually before harvest",
          equipment: "Combine harvester or sickles",
          fertilizer: "5-10 kg Potassium per acre if low",
        },
        scalableResources: { labor: [1, 2], fertilizer: [5, 10] },
        temperature: "15-22°C",
        description: "Grains fill and mature — reduce irrigation and prepare to harvest.",
        what_to_do: "Manage water so grains fill well but dry before harvest; harvest at correct moisture.",
        tips: "Do not delay harvest; lodging and shattering can reduce yield.",
        indicators: "Kernels are firm, and crop foliage yellows.",
        harvest_notes: "Harvest when grain moisture is ~20% or lower and dry to safe storage moisture."
      }
    ]
  },

  cassava: {
    name: "Cassava",
    growthPeriod: "8 - 18 months (varies with variety)",
    soil_preference: "Well-drained soils; tolerates poor soils but prefers loose soil for tuber growth",
    timeline: [
      {
        stage: "Stem Selection",
        duration: "5-7 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Light for cuttings",
          equipment: "Cutting tools",
          fertilizer: "10-15 kg NPK per acre at planting",
        },
        scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
        temperature: "25-30°C",
        description: "Select healthy cuttings/stems free of disease and of good length for planting.",
        what_to_do: "Choose healthy stems, cut into pieces of recommended length and treat if needed, plant at recommended spacing.",
        tips: "Use disease-free planting material to avoid spreading viruses.",
        indicators: "Fresh green sprouts after planting indicate good planting material.",
      },
      {
        stage: "Planting",
        duration: "10-15 days",
        resources: {
          labor: "3-5 workers per acre",
          water: "Moderate after planting",
          equipment: "Planting sticks or manual planting",
          fertilizer: "15-20 kg Nitrogen per acre",
        },
        scalableResources: { labor: [3, 5], fertilizer: [15, 20] },
        temperature: "27-35°C",
        description: "Plant cuttings upright or slanted at recommended depth and spacing.",
        what_to_do: "Plant cuttings at recommended spacing, firm soil around them, and keep weed-free first few weeks.",
        tips: "Planting at the start of the rainy season helps establishment.",
        indicators: "Cuttings sprout and grow new shoots within a few weeks.",
      },
      {
        stage: "Vegetative Growth",
        duration: "4-6 months",
        resources: {
          labor: "2-3 workers per acre",
          water: "Regular irrigation during dry spells",
          equipment: "Weeders",
          fertilizer: "20-25 kg Phosphorus per acre if soil low",
        },
        scalableResources: { labor: [2, 3], fertilizer: [20, 25] },
        temperature: "25-35°C",
        description: "Plants build leaves and stems while tuber initiation happens below ground.",
        what_to_do: "Keep weeds under control, maintain soil moisture, and apply fertilizer if soil test suggests.",
        tips: "Cassava tolerates low fertility but will give much more with good nutrition.",
        indicators: "Good green canopy and steady growth.",
      },
      {
        stage: "Tuber Bulking",
        duration: "3-5 months",
        resources: {
          labor: "3-4 workers per acre",
          water: "Controlled irrigation to avoid stress during bulking",
          equipment: "Moisture meters optional",
          fertilizer: "15-20 kg Potassium per acre",
        },
        scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
        temperature: "25-32°C",
        description: "Tuber size increases — keep moisture steady and manage pests or diseases.",
        what_to_do:
          "Monitor tuber growth by sampling, avoid drought or waterlogging, and protect crop from termites or rodents.",
        tips: "Harvest window can be flexible — do not let tubers stay too long or they may become fibrous.",
        indicators: "Tuber sizes increase and foliage stays green until harvest.",
        harvest_notes: "Harvest when tubers reach desired size; handle gently to avoid damage."
      }
    ]
  },

  "sweet potatoes": {
    name: "Sweet Potatoes",
    growthPeriod: "90 - 150 days",
    soil_preference: "Light, sandy loam with good drainage",
    timeline: [
      {
        stage: "Vine Preparation",
        duration: "10-15 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Moderate",
          equipment: "Cutting tools",
          fertilizer: "10-15 kg NPK per acre at planting",
        },
        scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
        temperature: "25-30°C",
        description: "Prepare healthy vine cuttings for planting to ensure good establishment.",
        what_to_do: "Select vigorous vines, cut into planting pieces, and keep shaded before planting.",
        tips: "Use healthy, disease-free material to avoid introducing pests.",
        indicators: "Cuttings root and begin sprouting after planting.",
      },
      {
        stage: "Planting",
        duration: "5-7 days",
        resources: {
          labor: "3-4 workers per acre",
          water: "Regular irrigation after planting",
          equipment: "Planter or hand",
          fertilizer: "15-20 kg Nitrogen per acre",
        },
        scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
        temperature: "27-35°C",
        description: "Plant vine cuttings at recommended spacing and keep soil moist for rooting.",
        what_to_do: "Plant cuttings with buds facing up, firm soil around them, and maintain moisture.",
        tips: "Avoid planting in water-logged soils.",
        indicators: "Good rooting and green growth in 2-3 weeks.",
      },
      {
        stage: "Vine Development",
        duration: "40-60 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Controlled irrigation",
          equipment: "Sprayers for pests",
          fertilizer: "20-25 kg Phosphorus per acre if required",
        },
        scalableResources: { labor: [2, 3], fertilizer: [20, 25] },
        temperature: "25-32°C",
        description: "Vines spread and photosynthesize to produce energy for tuber formation.",
        what_to_do: "Support vines if needed, control weeds, and manage pests.",
        tips: "Mulch can conserve moisture and reduce weeds.",
        indicators: "Vine canopy covers the ground and vines look healthy.",
      },
      {
        stage: "Tuber Formation",
        duration: "50-70 days",
        resources: {
          labor: "1-2 workers per acre",
          water: "Reduced irrigation before harvest",
          equipment: "Moisture sensor optional",
          fertilizer: "10-15 kg Potassium per acre",
        },
        scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
        temperature: "20-28°C",
        description: "Tubers form and grow — avoid water stress to keep quality.",
        what_to_do: "Monitor moisture, avoid overwatering, and prepare for harvest when skins are firm.",
        tips: "Avoid damaging tubers while harvesting; cure after harvest if storing.",
        indicators: "Tubers firm to touch and vines may begin yellowing near harvest time.",
        harvest_notes: "Harvest carefully to avoid bruising; cure in shade if storing."
      }
    ]
  },

  "plantains & others": {
    name: "Plantains & Others",
    growthPeriod: "9 - 12 months",
    soil_preference: "Rich, well-drained soils; lots of organic matter",
    timeline: [
      {
        stage: "Sucker Selection",
        duration: "10-15 days",
        resources: {
          labor: "2-3 workers per acre-equivalent (planting area)",
          water: "Moderate",
          equipment: "Cutting tools",
          fertilizer: "15-20 kg NPK per acre-equivalent during establishment",
        },
        scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
        temperature: "25-30°C",
        description: "Choose healthy suckers (young shoots) free of pests and disease to plant.",
        what_to_do: "Select robust suckers with healthy roots; prepare planting holes with compost if available.",
        tips: "Avoid sick-looking suckers; spacing is important for sunlight and wind protection.",
        indicators: "Suckers sprout and grow vigorously after planting.",
      },
      {
        stage: "Planting",
        duration: "15-20 days",
        resources: {
          labor: "3-4 workers per planting area",
          water: "Heavy irrigation initially if dry",
          equipment: "Shovels and digging tools",
          fertilizer: "20-25 kg Nitrogen per acre-equivalent at establishment",
        },
        scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
        temperature: "27-35°C",
        description: "Plant at recommended spacing and protect from wind damage in early months.",
        what_to_do: "Plant in well-prepared pits, add organic matter, and water well to settle plants.",
        tips: "Use windbreaks if area is exposed.",
        indicators: "New leaves and steady growth.",
      },
      {
        stage: "Vegetative Growth",
        duration: "5-7 months",
        resources: {
          labor: "2-3 workers per area",
          water: "Regular irrigation",
          equipment: "Pruning tools",
          fertilizer: "25-30 kg Phosphorus per acre-equivalent if needed",
        },
        scalableResources: { labor: [2, 3], fertilizer: [25, 30] },
        temperature: "25-35°C",
        description: "Plants establish and grow tall; prune and maintain clean base for healthy bunch development.",
        what_to_do: "Remove old leaves, control pests, support plants when bunches form.",
        tips: "Keep planting area mulched and moist for good bunch weights.",
        indicators: "Healthy pseudostem and leaf development; bunch formation begins later.",
      },
      {
        stage: "Bunch Development",
        duration: "3-4 months",
        resources: {
          labor: "3-4 workers per area",
          water: "Controlled irrigation to support bunch filling",
          equipment: "Support poles and moisture meters optional",
          fertilizer: "15-20 kg Potassium per acre-equivalent",
        },
        scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
        temperature: "25-32°C",
        description: "Bunches form and fruit grows — manage water and protect from pests.",
        what_to_do: "Support heavy bunches, protect from insects and diseases, and harvest when ready.",
        tips: "Harvest at correct maturity for market; avoid bruising during harvest.",
        indicators: "Bunches fill and fingers show maturity color and size.",
        harvest_notes: "Harvest in stages if needed; handle gently to avoid damage."
      }
    ]
  },

  yams: {
    name: "Yams",
    growthPeriod: "8 - 12 months",
    soil_preference: "Well-drained, loamy soils with good organic matter",
    timeline: [
      {
        stage: "Seed Yam Preparation",
        duration: "15-20 days",
        resources: {
          labor: "2-3 workers per acre",
          water: "Light irrigation to keep cut sets healthy",
          equipment: "Cutting tools",
          fertilizer: "10-15 kg NPK per acre at planting",
        },
        scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
        temperature: "25-30°C",
        description: "Select healthy seed yams and prepare pieces for planting.",
        what_to_do: "Choose healthy tubers, cut into recommended sizes, treat if necessary and plant in prepared ridges.",
        tips: "Allow cut surfaces to dry a little before planting to reduce rots.",
        indicators: "Cut pieces sprout and root after planting.",
      },
      {
        stage: "Planting",
        duration: "10-15 days",
        resources: {
          labor: "3-4 workers per acre",
          water: "Moderate irrigation initially",
          equipment: "Digging tools",
          fertilizer: "20-25 kg Nitrogen per acre",
        },
        scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
        temperature: "27-35°C",
        description: "Plant pieces at correct spacing and depth in ridges or mounds.",
        what_to_do: "Plant seed yams at recommended spacing, cover well, and water to settle soil.",
        tips: "Plant at start of rainy season if possible for easy establishment.",
        indicators: "New shoots appear and plants establish.",
      },
      {
        stage: "Vine Training",
        duration: "2-3 months",
        resources: {
          labor: "2-3 workers per acre",
          water: "Regular irrigation",
          equipment: "Support trellis or stakes if needed",
          fertilizer: "15-20 kg Phosphorus per acre",
        },
        scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
        temperature: "25-32°C",
        description: "Train vines for better sunlight capture and tuber development.",
        what_to_do: "Guide vines on trellis, remove weak shoots, and maintain soil moisture.",
        tips: "Training helps reduce disease by improving airflow.",
        indicators: "Vines grow well and shade the soil.",
      },
      {
        stage: "Tuber Maturation",
        duration: "4-6 months",
        resources: {
          labor: "1-2 workers per acre",
          water: "Reduce irrigation nearer harvest",
          equipment: "Moisture meters optional",
          fertilizer: "10-15 kg Potassium per acre if needed",
        },
        scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
        temperature: "20-28°C",
        description: "Allow tubers to bulk up; avoid waterlogging and physical damage when harvesting.",
        what_to_do: "Stop irrigation gradually, check tuber maturity, and plan harvest to avoid wet conditions.",
        tips: "Be careful during harvest to prevent cuts to tubers; cure if storing for long.",
        indicators: "Vines yellow and tubers are firm on digging sample plants.",
        harvest_notes: "Harvest carefully and store in a cool, dry place."
      }
    ]
  }
};

export default cropData;
