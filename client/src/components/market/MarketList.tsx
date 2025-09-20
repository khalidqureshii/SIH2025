import React from "react";
import { Market } from "@/store/Types";
import MarketCard from "./MarketCard";

const MarketList: React.FC<{ markets: Market[]; commodity?: string }> = ({ markets, commodity }) => {
  if (markets.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 text-center text-slate-500">
        <p className="mb-3">No markets found for the selected filters.</p>
        <p className="text-sm">Try changing the state or district, or pick a different commodity.</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
      {markets.map((m) => (
        <MarketCard key={m.id} market={m} commodity={commodity} />
      ))}
    </section>
  );
};

export default MarketList;
