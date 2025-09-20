import React, { useState } from "react";
import MarketForm from "@/components/market/MarketForm";
import MarketResults from "@/components/market/MarketResults";

const MarketPage: React.FC = () => {
  const [filters, setFilters] = useState<{ state: string; district: string; commodity: string } | null>(null);

  const handleFormSubmit = (data: { state: string; district: string; commodity: string }) => {
    setFilters(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Market Price Finder</h1>

      <MarketForm onSubmit={handleFormSubmit} />

      {filters && (
        <MarketResults filters={filters} />
      )}
    </div>
  );
};

export default MarketPage;
