import React from "react";
import MarketCard from "@/components/market/MarketCard";
import { useTranslation } from "react-i18next";

interface ResultsProps {
  filters: { state: string; district: string; commodity: string };
}

const MarketResults: React.FC<ResultsProps> = ({ filters }) => {
  // Static mock data for now
  const data = [
    { market: "Mumbai Central Market", price: "₹2500 / quintal", variants: ["A Grade", "B Grade"] },
    { market: "Thane Wholesale Market", price: "₹2300 / quintal", variants: ["A Grade", "C Grade"] },
    { market: "Pune City Market", price: "₹2450 / quintal", variants: ["Premium", "Standard"] },
  ];

  const { t } = useTranslation();

  return (
    <div className="mt-8 w-full max-w-5xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {t("market.results.header")} <span className="text-blue-700">{filters.commodity}</span> {t("market.results.in")} {filters.district}, {filters.state}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <MarketCard key={index} market={item.market} price={item.price} variants={item.variants} />
        ))}
      </div>
    </div>
  );
};

export default MarketResults;
