import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Line,
} from "recharts";
import Loader from "../common/Loader";
import { useTranslation } from "react-i18next";

interface GraphsProps {
  data: {
    forecast: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        totalprecip_mm: number;
      };
    }[];
  } | null;
  title?: string;
  height?: number;
  className?: string;
  loading?: boolean;
  error?: string | null;
}

const Graphs: React.FC<GraphsProps> = (props) => {
  const { t } = useTranslation();
  const {
    data,
    title = t("graph.title"),
    height = 300,
    className = "",
    loading = false,
    error = null,
  } = props;

  if (loading) {
    return (
      <Loader
        src="https://lottie.host/59bd733b-8f3d-490e-a778-6f91b97d5ffb/2t8ay63ll6.lottie"
        message={t("graph.loader_message")}
      />
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center bg-red-100 text-red-700 rounded-lg shadow">
        {error}
      </div>
    );
  }

  if (!data || !data.forecast || data.forecast.length === 0) {
    return (
      <div className="p-4 text-center bg-red-100 text-red-700 rounded-lg shadow">
        {t("graph.no_data")}
      </div>
    );
  }

  const chartData = data.forecast.map((day) => ({
    date: day.date,
    AvgTemp: Math.round((day.day.maxtemp_c + day.day.mintemp_c) / 2),
    Rain: day.day.totalprecip_mm,
  }));

  return (
    <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={{ fill: "#4b5563", fontSize: 12 }}
          />

          <YAxis
            yAxisId="left"
            orientation="left"
            label={{
              value: t("graph.y_axis_left_label"),
              angle: -90,
              position: "insideLeft",
              fill: "#4b5563",
              fontSize: 12,
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: t("graph.y_axis_right_label"),
              angle: 90,
              position: "insideRight",
              fill: "#4b5563",
              fontSize: 12,
            }}
          />

          <Tooltip
            formatter={(value, name) => {
              if (name === "Rain") return [value, t("graph.data_keys.rain")];
              if (name === "AvgTemp")
                return [value, t("graph.data_keys.avg_temp")];
              return [value, name];
            }}
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: 8,
              border: "1px solid #d1d5db",
            }}
          />

          <Legend
            formatter={(value) => {
              if (value === "Rain") return t("graph.data_keys.rain");
              if (value === "AvgTemp") return t("graph.data_keys.avg_temp");
              return value;
            }}
            wrapperStyle={{ fontSize: 12 }}
          />

          <Bar
            yAxisId="right"
            dataKey="Rain"
            name={t("graph.data_keys.rain")}
            barSize={20}
            fill="#6366f1"
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="AvgTemp"
            name={t("graph.data_keys.avg_temp")}
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;
