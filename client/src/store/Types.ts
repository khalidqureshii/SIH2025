export type UserType = {
  _id: string;
  username: string;
  email: string;
  location: string;
  joinedOn: Date;
};

export type CommodityPrice = {
  variant: string;
  price: number; // price per unit
  unit: string; // e.g. "kg"
  change24h?: number; // optional percent change
};

export type Market = {
  id: string;
  state: string;
  district: string;
  marketName: string;
  lastUpdated: string; // ISO date
  commodities: Record<string, CommodityPrice[]>; // keyed by commodity name
};
