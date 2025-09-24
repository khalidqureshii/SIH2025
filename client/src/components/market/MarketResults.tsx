import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MarketCard from "@/components/market/MarketCard";
// import { useTranslation } from "react-i18next";
import { LINK } from "@/store/Link";
import Loader from "../common/Loader";

interface Filters {
  state: string;
  district: string;
  commodity: string;
}

interface PriceRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety?: string | null;
  grade?: string | null;
  arrival_date?: string | null;
  min_price?: string | number | null;
  max_price?: string | number | null;
  modal_price?: string | number | null;
}

interface Props {
  filters: Filters;
}

type Status = "idle" | "pending" | "success" | "error";

const MarketResults: React.FC<Props> = ({ filters }) => {
  // const { t } = useTranslation();
  const [records, setRecords] = useState<PriceRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>("idle");

  const filtersComplete =
    filters.state && filters.district && filters.commodity;

  useEffect(() => {
    if (!filtersComplete) {
      setStatus("idle");
      setRecords([]);
      setError(null);
      return;
    }

    setStatus("pending");
    setRecords([]);
    setError(null);

    const controller = new AbortController();
    const fetchPrices = async () => {
      try {
        const res = await axios.get<PriceRecord[]>(`${LINK}/api/price/getPrice`, {
          params: {
            state: filters.state,
            district: filters.district,
            commodity: filters.commodity,
          },
          signal: controller.signal,
        });

        setRecords(Array.isArray(res.data) ? res.data : []);
        setStatus("success");
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching prices:", err);
          setError(
            err?.response?.data?.error ??
              err.message ??
              "Failed to fetch prices"
          );
          setStatus("error");
        }
      }
    };

    fetchPrices();

    return () => controller.abort();
  }, [filters]);

  const renderPrice = (r: PriceRecord) => {
    if (r.modal_price) return `₹${r.modal_price} / quintal`;
    if (r.min_price || r.max_price)
      return `₹${r.min_price ?? "—"} - ₹${r.max_price ?? "—"}`;
    return "Price N/A";
  };

  return (
    <div className="mt-8 w-full max-w-5xl">
      {/* <div className="flex justify-center items-center p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {t("market.results.header")}{" "}
          <span className="font-bold text-red-600 italic">
            {filters.commodity}
          </span>{" "}
          {t("market.results.in")} {filters.district}, {filters.state}
        </h2>
      </div> */}

      {status === "idle" && (
        <div className="py-8 text-black text-center">
          Please choose filters and click Search to see prices.
        </div>
      )}

      {status === "pending" && (
        // <div className="py-8 text-center">Loading market data…</div>
        <Loader
          src="https://lottie.host/51bf7e3a-7e4d-4666-9528-180a22e144a0/ePlh0H1Vu8.lottie"
          message="Loading market prices…"
        />
      )}

      {status === "error" && (
        <div className="text-red-600 py-4 text-center">{error}</div>
      )}

      {status === "success" && records.length === 0 && (
        <div className="py-8 text-black text-center">
          No price data found for the selected filters.
        </div>
      )}

      {status === "success" && records.length > 0 && (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {records.map((r, i) => {
              const variants = [
                ...(r.variety ? [String(r.variety)] : []),
                ...(r.grade ? [String(r.grade)] : []),
              ];
              return (
                <motion.div
                  key={`${r.market}-${r.commodity}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MarketCard
                    market={r.market ?? "Unknown market"}
                    price={renderPrice(r)}
                    variants={variants.length ? variants : ["Standard"]}
                    arrivalDate={r.arrival_date}
                    commodity={r.commodity}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MarketResults;