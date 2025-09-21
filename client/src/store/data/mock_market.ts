import { Market } from "@/store/Types";

export const MOCK_MARKETS: Market[] = [
  {
    id: "m1",
    state: "Maharashtra",
    district: "Pune",
    marketName: "Pune APMC Market",
    lastUpdated: "2025-09-18T08:30:00.000Z",
    commodities: {
      Onion: [
        { variant: "Common Onion (Red)", price: 22, unit: "kg", change24h: -1.2 },
        { variant: "White Onion", price: 28, unit: "kg", change24h: 0.5 },
      ],
      Tomato: [
        { variant: "Hill Tomato", price: 40, unit: "kg", change24h: -2.1 },
      ],
    },
  },
  {
    id: "m2",
    state: "Maharashtra",
    district: "Pune",
    marketName: "Pimpri Market",
    lastUpdated: "2025-09-19T06:20:00.000Z",
    commodities: {
      Onion: [
        { variant: "Common Onion (Red)", price: 21.5, unit: "kg", change24h: -0.7 },
        { variant: "Granular Onion", price: 23.5, unit: "kg", change24h: 0.0 },
      ],
      Potato: [
        { variant: "Kashmiri Potato", price: 28, unit: "kg" },
      ],
    },
  },
  {
    id: "m3",
    state: "Gujarat",
    district: "Surat",
    marketName: "Surat Wholesale Market",
    lastUpdated: "2025-09-19T10:10:00.000Z",
    commodities: {
      Onion: [
        { variant: "Common Onion (Red)", price: 20, unit: "kg", change24h: -3.0 },
      ],
      Tomato: [
        { variant: "Rooftop Tomato", price: 35, unit: "kg" },
      ],
    },
  },
  {
    id: "m4",
    state: "Maharashtra",
    district: "Nagpur",
    marketName: "Nagpur APMC",
    lastUpdated: "2025-09-17T12:00:00.000Z",
    commodities: {
      Onion: [
        { variant: "Maharashtra Medium", price: 24, unit: "kg" },
      ],
    },
  },
];
