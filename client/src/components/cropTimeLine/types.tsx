export interface PestDiseaseInfo {
  name: string;
  control: string;
}

export interface ScalableResources {
  [key: string]: [number, number];
}

export interface StageResource {
  [key: string]: string;
}

export interface CropStage {
  stage: string;
  duration: string;
  resources: {
    labor: string;
    water: string;
    equipment: string;
    fertilizer: string;
  };
  scalableResources: {
  [key: string]: [number, number];
};
  temperature: string;
  description: string;
  what_to_do: string; // <-- Add this line
  tips: string;
  indicators: string;
  pests_and_diseases?: PestDiseaseInfo[];
  harvest_notes?: string | null;
}

export interface CropInfo {
  name: string;
  growthPeriod: string;
  soil_preference: string;
  timeline: CropStage[];
}

export interface CropDataType {
  [key: string]: CropInfo;
}
