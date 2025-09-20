import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MarketCardProps {
  market: string;
  price: string;
  variants: string[];
}

const MarketCard: React.FC<MarketCardProps> = ({ market, price, variants }) => {
  return (
    <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{market}</h3>
        <p className="text-blue-700 font-semibold mt-2">{price}</p>
        <ul className="mt-3 text-sm text-gray-600 space-y-1">
          {variants.map((variant, i) => (
            <li key={i} className="px-2 py-1 bg-blue-50 rounded-md inline-block mr-2">
              {variant}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
