interface ScalableResources {
  [key: string]: [number, number];
}

interface StageResource {
  [key: string]: string;
}

interface CropStage {
  stage: string;
  duration: string;
  resources: StageResource;
  scalableResources: ScalableResources;
  temperature: string;
  description?: string; // Added optional description property
}

interface CropInfo {
  name: string;
  growthPeriod: string;
  timeline: CropStage[];
}

interface CropDataType {
  [key: string]: CropInfo;
}

const cropData: CropDataType = {
    maize: {
      name: "Maize",
      growthPeriod: "90-120 days",
      timeline: [
        {
          stage: "Soil Preparation",
          duration: "10-15 days",
          resources: {
            labor: "1-2 workers per acre",
            water: "Minimal",
            equipment: "Plow, harrow, tractor",
            fertilizer: "15-20 kg NPK per acre",
          },
          scalableResources: { labor: [1, 2], fertilizer: [15, 20] },
          temperature: "15-25°C",
          description: "Prepare the soil by plowing and harrowing to create a fine seedbed."
        },
        {
          stage: "Emergence",
          duration: "4-10 days",
          resources: {
            labor: "1 worker per acre",
            water: "Moderate irrigation",
            equipment: "Planter",
            fertilizer: "5-10 kg N per acre",
          },
          scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
          temperature: "20-30°C",
          description: "Ensure consistent moisture for seed germination and early growth."
        },
        {
          stage: "Weaning (4-5 leaf)",
          duration: "14-21 days",
          resources: {
            labor: "1-2 workers",
            water: "Regular irrigation",
            equipment: "Sprayers",
            fertilizer: "10-15 kg P per acre",
          },
          scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
          temperature: "25-35°C",
          description: "Maintain soil moisture and apply phosphorus to support root development."
        },
        {
          stage: "Tassel Visible",
          duration: "7-10 days",
          resources: {
            labor: "2 workers",
            water: "Heavy irrigation",
            equipment: "Fertilizer applicator",
            fertilizer: "20-25 kg N per acre",
          },
          scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
          temperature: "25-30°C",
          description: "Increase nitrogen application to support rapid vegetative growth."
        },
        {
          stage: "Grain Maturation",
          duration: "30-40 days",
          resources: {
            labor: "1 worker",
            water: "Reduced irrigation",
            equipment: "Moisture meter",
            fertilizer: "5-10 kg K per acre",
          },
          scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
          temperature: "20-25°C",
          description: "Gradually reduce irrigation to allow grains to mature and harden."
        },
      ],
    },
    potatoes: {
      name: "Potatoes",
      growthPeriod: "80-100 days",
      timeline: [
        {
          stage: "Sprout Development",
          duration: "2-6 weeks",
          resources: {
            labor: "2-3 workers",
            water: "Moderate",
            equipment: "Planter",
            fertilizer: "10-15 kg/acre",
          },
          scalableResources: { labor: [2, 3], fertilizer: [10, 15] },
          temperature: "15-20°C",
          description: "Ensure soil temperature is optimal for sprout emergence."
        },
        {
          stage: "Vegetative Growth",
          duration: "4-5 weeks",
          resources: {
            labor: "2 workers",
            water: "Regular irrigation",
            equipment: "Cultivator",
            fertilizer: "15-20 kg NPK",
          },
          scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
          temperature: "18-25°C",
          description: "Maintain consistent moisture and nutrient levels for healthy foliage development."
        },
        {
          stage: "Tuber Formation",
          duration: "5-6 weeks",
          resources: {
            labor: "3 workers",
            water: "Heavy irrigation",
            equipment: "Hillers",
            fertilizer: "20-25 kg K per acre",
          },
          scalableResources: { labor: [3, 3], fertilizer: [20, 25] },
          temperature: "15-20°C",
          description: "Increase potassium application to support tuber development."
        },
        {
          stage: "Tuber Bulking",
          duration: "4-5 weeks",
          resources: {
            labor: "2 workers",
            water: "Controlled irrigation",
            equipment: "Moisture sensors",
            fertilizer: "10-15 kg P per acre",
          },
          scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
          temperature: "16-22°C",
          description : "Monitor soil moisture closely to prevent water stress during tuber bulking."
        },
      ],
    },
    "rice (paddy)": {
      name: "Rice (Paddy)",
      growthPeriod: "120-150 days",
      timeline: [
        {
          stage: "Land Preparation",
          duration: "15-20 days",
          resources: {
            labor: "3-4 workers",
            water: "Flooding required",
            equipment: "Puddler",
            fertilizer: "15-20 kg/acre",
          },
          scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
          temperature: "20-30°C",
          description: "Prepare the field by puddling to create a suitable environment for rice transplantation."
        },
        {
          stage: "Vegetative Phase",
          duration: "40-50 days",
          resources: {
            labor: "4 workers",
            water: "Continuous flooding",
            equipment: "Transplanter",
            fertilizer: "25-30 kg N per acre",
          },
          scalableResources: { labor: [4, 4], fertilizer: [25, 30] },
          temperature: "25-35°C",
          description: "Maintain continuous flooding to support healthy plant growth."
        },
        {
          stage: "Reproductive Phase",
          duration: "30-35 days",
          resources: {
            labor: "3 workers",
            water: "Controlled drainage",
            equipment: "Sprayers",
            fertilizer: "15-20 kg P per acre",
          },
          scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
          temperature: "28-32°C",
          description: "Implement controlled drainage to optimize water use during flowering and grain filling."
        },
        {
          stage: "Ripening Phase",
          duration: "25-30 days",
          resources: {
            labor: "2 workers",
            water: "Field drying",
            equipment: "Combine harvester",
            fertilizer: "10-15 kg K per acre",
          },
          scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
          temperature: "20-25°C",
          description: "Allow the field to dry before harvesting to ensure optimal grain quality."
        },
      ],
    },
    sorghum: {
      name: "Sorghum",
      growthPeriod: "100-130 days",
      timeline: [
        {
          stage: "Seedling Emergence",
          duration: "3-14 days",
          resources: {
            labor: "1-2 workers",
            water: "Light irrigation",
            equipment: "Planter",
            fertilizer: "10-15 kg/acre",
          },
          scalableResources: { labor: [1, 2], fertilizer: [10, 15] },
          temperature: "20-30°C",
          description: "Ensure soil moisture is adequate for seed germination."
        },
        {
          stage: "Tillering",
          duration: "20-25 days",
          resources: {
            labor: "2 workers",
            water: "Moderate irrigation",
            equipment: "Cultivator",
            fertilizer: "15-20 kg N per acre",
          },
          scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
          temperature: "25-35°C",
          description: "Maintain consistent moisture and nutrient levels for healthy tiller development."
        },
        {
          stage: "Stem Elongation",
          duration: "25-30 days",
          resources: {
            labor: "3 workers",
            water: "Regular irrigation",
            equipment: "Sprayers",
            fertilizer: "20-25 kg NPK per acre",
          },
          scalableResources: { labor: [3, 3], fertilizer: [20, 25] },
          temperature: "25-30°C",
          description: "Increase nitrogen application to support rapid stem growth."
        },
        {
          stage: "Grain Maturation",
          duration: "30-40 days",
          resources: {
            labor: "1 worker",
            water: "Reduced irrigation",
            equipment: "Combine harvester",
            fertilizer: "5-10 kg K per acre",
          },
          scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
          temperature: "20-25°C",
          description: "Gradually reduce irrigation to allow grains to mature and harden."
        },
      ],
    },
    soybeans: {
      name: "Soybeans",
      growthPeriod: "80-120 days",
      timeline: [
        {
          stage: "Seed Treatment",
          duration: "1-2 days",
          resources: {
            labor: "1 worker per acre",
            water: "Light irrigation",
            equipment: "Seed treater",
            fertilizer: "5-10 kg inoculant per acre"
          },
          scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
          temperature: "20-25°C",
          description: "Treat seeds with inoculants to enhance nitrogen fixation."
        },
        {
          stage: "Germination",
          duration: "5-10 days",
          resources: {
            labor: "1 worker",
            water: "Moderate irrigation",
            equipment: "Planter",
            fertilizer: "10-15 kg N per acre"
          },
          scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
          temperature: "25-30°C",
          description: "Ensure consistent moisture for seed germination and early growth."
        },
        {
          stage: "Vegetative Growth",
          duration: "30-40 days",
          resources: {
            labor: "2 workers",
            water: "Regular irrigation",
            equipment: "Sprayers",
            fertilizer: "15-20 kg P per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
          temperature: "25-35°C",
          description: "Maintain soil moisture and apply phosphorus to support healthy vegetative growth."
        },
        {
          stage: "Pod Formation",
          duration: "25-35 days",
          resources: {
            labor: "2 workers",
            water: "Controlled irrigation",
            equipment: "Moisture sensors",
            fertilizer: "10-15 kg K per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
          temperature: "20-30°C",
          description: "Monitor soil moisture closely to prevent water stress during pod formation."
        }
      ]
    },
    wheat: {
      name: "Wheat",
      growthPeriod: "120-150 days",
      timeline: [
        {
          stage: "Seedbed Preparation",
          duration: "10-15 days",
          resources: {
            labor: "2-3 workers",
            water: "Light irrigation",
            equipment: "Plow, harrow",
            fertilizer: "15-20 kg DAP per acre"
          },
          scalableResources: { labor: [2, 3], fertilizer: [15, 20] },
          temperature: "15-20°C",
          description: "Prepare a fine seedbed to ensure good seed-to-soil contact."
        },
        {
          stage: "Tillering",
          duration: "30-40 days",
          resources: {
            labor: "2 workers",
            water: "Moderate irrigation",
            equipment: "Sprayers",
            fertilizer: "20-25 kg N per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
          temperature: "18-25°C",
          description: "Maintain consistent moisture and nutrient levels for healthy tiller development."
        },
        {
          stage: "Stem Extension",
          duration: "25-30 days",
          resources: {
            labor: "3 workers",
            water: "Regular irrigation",
            equipment: "Fertilizer applicator",
            fertilizer: "15-20 kg NPK per acre"
          },
          scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
          temperature: "20-28°C",
          description: "Increase nitrogen application to support rapid stem growth."
        },
        {
          stage: "Grain Filling",
          duration: "35-45 days",
          resources: {
            labor: "1 worker",
            water: "Reduced irrigation",
            equipment: "Combine harvester",
            fertilizer: "5-10 kg K per acre"
          },
          scalableResources: { labor: [1, 1], fertilizer: [5, 10] },
          temperature: "15-22°C",
          description: "Gradually reduce irrigation to allow grains to mature and harden."
        }
      ]
    },
    cassava: {
      name: "Cassava",
      growthPeriod: "8-18 months",
      timeline: [
        {
          stage: "Stem Selection",
          duration: "5-7 days",
          resources: {
            labor: "2 workers",
            water: "Light irrigation",
            equipment: "Cutting tools",
            fertilizer: "10-15 kg NPK per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
          temperature: "25-30°C",
          description: "Select healthy stems for planting to ensure good crop establishment."
        },
        {
          stage: "Planting",
          duration: "10-15 days",
          resources: {
            labor: "3-4 workers",
            water: "Moderate irrigation",
            equipment: "Planting sticks",
            fertilizer: "15-20 kg N per acre"
          },
          scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
          temperature: "27-35°C",
          description: "Ensure proper planting depth and spacing for optimal growth."
        },
        {
          stage: "Vegetative Growth",
          duration: "4-6 months",
          resources: {
            labor: "2 workers",
            water: "Regular irrigation",
            equipment: "Weeders",
            fertilizer: "20-25 kg P per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
          temperature: "25-35°C",
          description: "Maintain soil moisture and apply phosphorus to support healthy vegetative growth."
        },
        {
          stage: "Tuber Bulking",
          duration: "3-5 months",
          resources: {
            labor: "3 workers",
            water: "Controlled irrigation",
            equipment: "Moisture meters",
            fertilizer: "15-20 kg K per acre"
          },
          scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
          temperature: "25-32°C",
          description: "Monitor soil moisture closely to prevent water stress during tuber bulking."
        }
      ]
    },
    "sweet potatoes": {
      name: "Sweet Potatoes",
      growthPeriod: "90-150 days",
      timeline: [
        {
          stage: "Vine Preparation",
          duration: "10-15 days",
          resources: {
            labor: "2 workers",
            water: "Moderate irrigation",
            equipment: "Cutting tools",
            fertilizer: "10-15 kg NPK per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
          temperature: "25-30°C",
          description: "Prepare healthy vine cuttings for planting to ensure good crop establishment."
        },
        {
          stage: "Planting",
          duration: "5-7 days",
          resources: {
            labor: "3-4 workers",
            water: "Regular irrigation",
            equipment: "Planting machine",
            fertilizer: "15-20 kg N per acre"
          },
          scalableResources: { labor: [3, 4], fertilizer: [15, 20] },
          temperature: "27-35°C",
          description: "Ensure proper planting depth and spacing for optimal growth."
        },
        {
          stage: "Vine Development",
          duration: "40-60 days",
          resources: {
            labor: "2 workers",
            water: "Controlled irrigation",
            equipment: "Sprayers",
            fertilizer: "20-25 kg P per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [20, 25] },
          temperature: "25-32°C",
          description: "Maintain soil moisture and apply phosphorus to support healthy vine growth."
        },
        {
          stage: "Tuber Formation",
          duration: "50-70 days",
          resources: {
            labor: "1 worker",
            water: "Reduced irrigation",
            equipment: "Moisture sensors",
            fertilizer: "10-15 kg K per acre"
          },
          scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
          temperature: "20-28°C",
          description: "Monitor soil moisture closely to prevent water stress during tuber formation."
        }
      ]
    },
    "plantains & others": {
      name: "Plantains & Others",
      growthPeriod: "9-12 months",
      timeline: [
        {
          stage: "Sucker Selection",
          duration: "10-15 days",
          resources: {
            labor: "2 workers",
            water: "Moderate irrigation",
            equipment: "Cutting tools",
            fertilizer: "15-20 kg NPK per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
          temperature: "25-30°C",
          description: "Select healthy suckers for planting to ensure good crop establishment."
        },
        {
          stage: "Planting",
          duration: "15-20 days",
          resources: {
            labor: "3-4 workers",
            water: "Heavy irrigation",
            equipment: "Digging tools",
            fertilizer: "20-25 kg N per acre"
          },
          scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
          temperature: "27-35°C",
          description: "Ensure proper planting depth and spacing for optimal growth."
        },
        {
          stage: "Vegetative Growth",
          duration: "5-7 months",
          resources: {
            labor: "2 workers",
            water: "Regular irrigation",
            equipment: "Pruning tools",
            fertilizer: "25-30 kg P per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [25, 30] },
          temperature: "25-35°C",
          description: "Maintain soil moisture and apply phosphorus to support healthy vegetative growth."
        },
        {
          stage: "Bunch Development",
          duration: "3-4 months",
          resources: {
            labor: "3 workers",
            water: "Controlled irrigation",
            equipment: "Support poles",
            fertilizer: "15-20 kg K per acre"
          },
          scalableResources: { labor: [3, 3], fertilizer: [15, 20] },
          temperature: "25-32°C",
          description: "Monitor soil moisture closely to prevent water stress during bunch development."
        }
      ]
    },
    yams: {
      name: "Yams",
      growthPeriod: "8-12 months",
      timeline: [
        {
          stage: "Seed Yam Preparation",
          duration: "15-20 days",
          resources: {
            labor: "2 workers",
            water: "Light irrigation",
            equipment: "Cutting tools",
            fertilizer: "10-15 kg NPK per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [10, 15] },
          temperature: "25-30°C",
          description: "Prepare healthy seed yams for planting to ensure good crop establishment."
        },
        {
          stage: "Planting",
          duration: "10-15 days",
          resources: {
            labor: "3-4 workers",
            water: "Moderate irrigation",
            equipment: "Digging tools",
            fertilizer: "20-25 kg N per acre"
          },
          scalableResources: { labor: [3, 4], fertilizer: [20, 25] },
          temperature: "27-35°C",
          description: "Ensure proper planting depth and spacing for optimal growth."
        },
        {
          stage: "Vine Training",
          duration: "2-3 months",
          resources: {
            labor: "2 workers",
            water: "Regular irrigation",
            equipment: "Support trellis",
            fertilizer: "15-20 kg P per acre"
          },
          scalableResources: { labor: [2, 2], fertilizer: [15, 20] },
          temperature: "25-32°C",
          description: "Train vines to grow on the trellis for better sunlight exposure."
        },
        {
          stage: "Tuber Maturation",
          duration: "4-6 months",
          resources: {
            labor: "1 worker",
            water: "Reduced irrigation",
            equipment: "Moisture meters",
            fertilizer: "10-15 kg K per acre"
          },
          scalableResources: { labor: [1, 1], fertilizer: [10, 15] },
          temperature: "20-28°C",
          description: "Monitor soil moisture closely to prevent water stress during tuber maturation."
        }
      ]
    }
  };

  export default cropData;