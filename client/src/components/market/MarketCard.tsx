// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";

// interface MarketCardProps {
//   market: string;
//   price: string;
//   variants: string[];
// }

// const MarketCard: React.FC<MarketCardProps> = ({ market, price, variants }) => {
//   return (
//     <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
//       <CardContent className="p-5">
//         <h3 className="text-lg font-bold text-gray-900">{market}</h3>
//         <p className="text-blue-700 font-semibold mt-2">{price}</p>
//         <ul className="mt-3 text-sm text-gray-600 space-y-1">
//           {variants.map((variant, i) => (
//             <li key={i} className="px-2 py-1 bg-blue-50 rounded-md inline-block mr-2">
//               {variant}
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//     </Card>
//   );
// };

// export default MarketCard;


import React from "react";
import { Market } from "@/store/Types";
import { MapPin, Clock } from "lucide-react";

const MarketCard: React.FC<{ market: Market; commodity?: string }> = ({ market, commodity }) => {
  const prices = commodity ? market.commodities[commodity] ?? [] : [];

  return (
    <article className="bg-white rounded-2xl shadow p-4 border border-slate-100 hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{market.marketName}</h3>
          <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
            <MapPin size={14} /> {market.district}, {market.state}
          </p>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Clock size={14} />
          <span>{new Date(market.lastUpdated).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4">
        {prices.length === 0 ? (
          <div className="text-sm text-slate-500">No data for selected commodity</div>
        ) : (
          <ul className="space-y-2">
            {prices.map((p) => (
              <li key={p.variant} className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">{p.variant}</div>
                  <div className="text-xs text-slate-500">unit: {p.unit}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">₹{p.price.toFixed(2)}</div>
                  {p.change24h !== undefined && (
                    <div
                      className={`text-xs mt-1 ${p.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {p.change24h >= 0 ? `+${p.change24h}%` : `${p.change24h}%`} (24h)
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-400">Source: Mock data</div>
        <button className="text-sm px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">View details</button>
      </div>
    </article>
  );
};

export default MarketCard;
