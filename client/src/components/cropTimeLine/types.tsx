export interface ScalableResources {
  [key: string]: [number, number];
}

export interface StageResource {
  [key: string]: string;
}

export interface CropStage {
  stage: string;
  duration: string;
  resources: StageResource;
  scalableResources: ScalableResources;
  temperature: string;
  description?: string;  // optional
}

export interface CropInfo {
  name: string;
  growthPeriod: string;
  timeline: CropStage[];
}

export interface CropDataType {
  [key: string]: CropInfo;
}
