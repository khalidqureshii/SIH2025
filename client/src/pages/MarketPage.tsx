// import React, { useState } from "react";
// import MarketForm from "@/components/market/MarketForm";
// import MarketResults from "@/components/market/MarketResults";

// const MarketPage: React.FC = () => {
//   const [filters, setFilters] = useState<{ state: string; district: string; commodity: string } | null>(null);

//   const handleFormSubmit = (data: { state: string; district: string; commodity: string }) => {
//     setFilters(data);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
//       <h1 className="text-4xl font-bold text-blue-900 mb-6">Market Price Finder</h1>

//       <MarketForm onSubmit={handleFormSubmit} />

//       {filters && (
//         <MarketResults filters={filters} />
//       )}
//     </div>
//   );
// };

// export default MarketPage;


// V2


// import React, { useMemo, useState } from "react";
// import SearchForm from "@/components/market/SearchForm";
// import MarketList from "@/components/market/MarketList";
// import { MOCK_MARKETS } from "@/store/data/mock_market";
// import { deriveFilters } from "../utils/deriveFilters";

// const MarketPage: React.FC = () => {
//   const { states: STATE_OPTIONS, districtsByState: DISTRICTS_BY_STATE, commodities: COMMODITY_OPTIONS } = useMemo(
//     () => deriveFilters(MOCK_MARKETS),
//     []
//   );

//   // form state
//   const [state, setState] = useState<string>("Maharashtra");
//   const [district, setDistrict] = useState<string>("Pune");
//   const [commodity, setCommodity] = useState<string>("Onion");

//   // derived filtered list
//   const filteredMarkets = useMemo(() => {
//     return MOCK_MARKETS.filter((m) => {
//       if (state && m.state !== state) return false;
//       if (district && m.district !== district) return false;
//       if (commodity && !m.commodities[commodity]) return false;
//       return true;
//     });
//   }, [state, district, commodity]);

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
//       <header className="max-w-6xl mx-auto mb-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight">Market Prices</h1>
//             {/* <p className="text-sm text-slate-500 mt-1">Live-like mockup UI. Replace mock data with your API to fetch real values.</p> */}
//           </div>
//           {/* <div className="flex items-center gap-3">
//             <div className="text-sm text-slate-500">Try inputs:</div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => {
//                   setState("Maharashtra");
//                   setDistrict("Pune");
//                   setCommodity("Onion");
//                 }}
//                 className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm shadow-sm"
//               >
//                 Maharashtra / Pune / Onion
//               </button>

//               <button
//                 onClick={() => {
//                   setState("Gujarat");
//                   setDistrict("Surat");
//                   setCommodity("Tomato");
//                 }}
//                 className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm shadow-sm"
//               >
//                 Gujarat / Surat / Tomato
//               </button>
//             </div>
//           </div> */}
//         </div>
//       </header>

//       <SearchForm
//         stateValue={state}
//         districtValue={district}
//         commodityValue={commodity}
//         stateOptions={STATE_OPTIONS}
//         districtOptions={state ? DISTRICTS_BY_STATE[state] ?? [] : []}
//         commodityOptions={COMMODITY_OPTIONS}
//         onChange={(p) => {
//           if (p.state !== undefined) setState(p.state ?? "");
//           if (p.district !== undefined) setDistrict(p.district ?? "");
//           if (p.commodity !== undefined) setCommodity(p.commodity ?? "");
//         }}
//         onClear={() => {
//           setState("");
//           setDistrict("");
//           setCommodity("");
//         }}
//       />

//       <div className="max-w-6xl mx-auto mt-6 px-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold">Results</h2>
//           <div className="text-sm text-slate-500">{filteredMarkets.length} market(s) found</div>
//         </div>
//       </div>

//       <MarketList markets={filteredMarkets} commodity={commodity} />

//       {/* <footer className="max-w-6xl mx-auto mt-16 text-center text-slate-400 text-sm">
//         Mock UI built with React + TypeScript + Tailwind. Integrate your API in place of the MOCK_MARKETS array.
//       </footer> */}
//     </main>
//   );
// };

// export default MarketPage;


import React, { useMemo, useState } from "react";
import SearchForm from "@/components/market/SearchForm";
import MarketList from "@/components/market/MarketList";
import { MOCK_MARKETS } from "@/store/data/mock_market";
import { deriveFilters } from "../utils/deriveFilters";

const MarketPage: React.FC = () => {
  const { states: STATE_OPTIONS, districtsByState: DISTRICTS_BY_STATE, commodities: COMMODITY_OPTIONS } = useMemo(
    () => deriveFilters(MOCK_MARKETS),
    []
  );

  // form state
  const [state, setState] = useState<string>("Maharashtra");
  const [district, setDistrict] = useState<string>("Pune");
  const [commodity, setCommodity] = useState<string>("Onion");

  // derived filtered list
  const filteredMarkets = useMemo(() => {
    // If user cleared all filters, don't show any results
    if (!state && !district && !commodity) return [];

    return MOCK_MARKETS.filter((m) => {
      if (state && m.state !== state) return false;
      if (district && m.district !== district) return false;
      if (commodity && !m.commodities[commodity]) return false;
      return true;
    });
  }, [state, district, commodity]);

  const anyFilterSelected = Boolean(state || district || commodity);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Market Prices</h1>
            <p className="text-sm text-slate-500 mt-1">Live-like mockup UI. Replace mock data with your API to fetch real values.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500">Try inputs:</div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setState("Maharashtra");
                  setDistrict("Pune");
                  setCommodity("Onion");
                }}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm shadow-sm"
              >
                Maharashtra / Pune / Onion
              </button>

              <button
                onClick={() => {
                  setState("Gujarat");
                  setDistrict("Surat");
                  setCommodity("Tomato");
                }}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm shadow-sm"
              >
                Gujarat / Surat / Tomato
              </button>
            </div>
          </div>
        </div>
      </header> */}

      <SearchForm
        stateValue={state}
        districtValue={district}
        commodityValue={commodity}
        stateOptions={STATE_OPTIONS}
        districtOptions={state ? DISTRICTS_BY_STATE[state] ?? [] : []}
        commodityOptions={COMMODITY_OPTIONS}
        onChange={(p) => {
          if (p.state !== undefined) setState(p.state ?? "");
          if (p.district !== undefined) setDistrict(p.district ?? "");
          if (p.commodity !== undefined) setCommodity(p.commodity ?? "");
        }}
        onClear={() => {
          setState("");
          setDistrict("");
          setCommodity("");
        }}
      />

      {anyFilterSelected && (
        <>
          <div className="max-w-6xl mx-auto mt-6 px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Results</h2>
              <div className="text-sm text-slate-500">{filteredMarkets.length} market(s) found</div>
            </div>
          </div>

          <MarketList markets={filteredMarkets} commodity={commodity} />
        </>
      )}

      {/* <footer className="max-w-6xl mx-auto mt-16 text-center text-slate-400 text-sm">
        Mock UI built with React + TypeScript + Tailwind. Integrate your API in place of the MOCK_MARKETS array.
      </footer> */}
    </main>
  );
};

export default MarketPage;
