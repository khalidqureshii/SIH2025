import { Market } from "@/store/Types";

export const deriveFilters = (markets: Market[]) => {
  const states = Array.from(new Set(markets.map((m) => m.state))).sort();
  const districtsByState: Record<string, string[]> = {};
  const commodities = new Set<string>();

  for (const m of markets) {
    districtsByState[m.state] ||= [];
    if (!districtsByState[m.state].includes(m.district)) districtsByState[m.state].push(m.district);
    Object.keys(m.commodities).forEach((c) => commodities.add(c));
  }

  Object.keys(districtsByState).forEach((s) => districtsByState[s].sort());

  return { states, districtsByState, commodities: Array.from(commodities).sort() };
};
