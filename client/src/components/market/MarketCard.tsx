import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";

interface MarketCardProps {
  market: string;
  price: string;
  variants: string[];
  arrivalDate?: string | null;
  commodity?: string | null;
}

const formatDate = (d?: string | null) => {
  if (!d) return "Date N/A";
  const parsed = new Date(d);
  if (isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const MarketCard: React.FC<MarketCardProps> = ({
  market,
  price,
  variants,
  arrivalDate,
  commodity,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-500 rounded-2xl border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                {market}
              </h3>
              {commodity && (
                <p className="text-sm text-gray-600 mt-1">{commodity}</p>
              )}
            </div>

            <div className="text-right">
              <p className="text-lg text-green-700 font-semibold">{price}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(arrivalDate)}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {variants && variants.length > 0 ? (
                variants.map((variant, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs shadow-sm"
                  >
                    {variant}
                  </motion.span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  Standard
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface MarketGridProps {
  data: MarketCardProps[];
}

export const MarketGrid: React.FC<MarketGridProps> = ({ data }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {data.map((item, i) => (
        <MarketCard key={i} {...item} />
      ))}
    </motion.div>
  );
};

export default MarketCard;
