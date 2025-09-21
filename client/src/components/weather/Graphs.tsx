import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  Area,
} from "recharts";
import Loader from "../common/Loader";
import { useTranslation } from "react-i18next";

const safeParseDate = (v: any) => {
  if (v instanceof Date) return v;
  const d = new Date(v);
  if (!isNaN(d.getTime())) return d;
  return null;
};

const useDateFormatter = () => {
  const { t, i18n } = useTranslation();

  const dayNames = t(`popover.weekdays.short`, { returnObjects: true }) as string[] | undefined;
  const monthNames = t(`popover.months.short`, { returnObjects: true }) as string[] | undefined;

  const isIntlSupported = (() => {
    try {
      const testDate = new Date(Date.UTC(2023, 0, 1));
      const formatted = new Intl.DateTimeFormat(i18n.language, { weekday: "short" }).format(
        testDate
      );
      return !/^[A-Za-z]+$/.test(formatted);
    } catch {
      return false;
    }
  })();

  return (raw: any) => {
    const d = safeParseDate(raw);
    if (!d) return String(raw ?? "");

    if (isIntlSupported) {
      const day = new Intl.DateTimeFormat(i18n.language, { weekday: "short" }).format(d);
      const newDate = new Intl.DateTimeFormat(i18n.language, {
        day: "numeric",
        month: "short",
      }).format(d);
      return `${day}, ${newDate}`;
    }

    const day = dayNames && dayNames.length ? dayNames[d.getDay()] : undefined;
    const month = monthNames && monthNames.length ? monthNames[d.getMonth()] : undefined;
    const newDate = `${d.getDate()}${month ? ` ${month}` : ""}`;
    return `${day ? `${day}, ` : ""}${newDate}`;
  };
};

const CustomTooltip = ({
  active,
  payload,
  label,
  lineColor,
  rainColor,
  lockedSeries,
  lockedLineColor,
  lockedRainColor,
  showDateInTooltip,
}: any) => {
  const formatDate = useDateFormatter();
  const { t } = useTranslation();

  if (active && (payload && payload.length)) {
    const uniqueMap = new Map<string, any>();
    payload.forEach((p: any) => {
      const key = p.dataKey ?? p.name ?? JSON.stringify(p);
      if (!uniqueMap.has(key)) uniqueMap.set(key, p);
    });
    const uniquePayload = Array.from(uniqueMap.values());

    return (
      <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
        {showDateInTooltip && label != null && (
          <div className="text-sm text-gray-500 mb-2">{formatDate(label)}</div>
        )}

        <div className="mt-2 space-y-1">
          {uniquePayload.map((pld: any, idx: number) => {
            const payloadColor = pld.color;
            const isTemp = pld.dataKey === "Temp";
            const isRain = pld.dataKey === "Rain";
            const fallback =
              (isTemp
                ? lockedSeries === "Temp"
                  ? lockedLineColor
                  : lineColor
                : isRain
                ? lockedSeries === "Rain"
                  ? lockedRainColor
                  : rainColor
                : lineColor) ?? "#000";
            const color = payloadColor ?? fallback;
            const displayName = isTemp
              ? t("graph.data_keys.avg_temp")
              : isRain
              ? t("graph.data_keys.rain")
              : pld.name;
            const key = `${pld.dataKey ?? pld.name ?? idx}`;
            return (
              <div key={key} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-600 text-sm">
                  {displayName}:{" "}
                  <span className="font-semibold text-gray-900">
                    {pld.value}
                    {isTemp ? "°C" : " mm"}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

const Graphs: React.FC<{
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
}> = (props) => {
  const { t } = useTranslation();
  const {
    data,
    title = t("graph.title"),
    height = 300,
    className = "",
    loading = false,
    error = null,
  } = props;

  const [hoverSeries, setHoverSeries] = useState<string | null>(null);
  const [lockedSeries, setLockedSeries] = useState<string | null>(null);
  const [legendCollapsed, setLegendCollapsed] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const effectiveActive = lockedSeries ?? hoverSeries;
  const formatDate = useDateFormatter();

  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    const handleMedia = () => setLegendCollapsed(m.matches);
    handleMedia();
    if (m.addEventListener) m.addEventListener("change", handleMedia);
    else m.addListener(handleMedia);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", handleMedia);
      else m.removeListener(handleMedia);
    };
  }, []);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (!root.contains(target)) {
        setLockedSeries(null);
        setHoverSeries(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

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
    Temp: Math.round((day.day.maxtemp_c + day.day.mintemp_c) / 2),
    Rain: day.day.totalprecip_mm,
  }));

  const lineColor = "#ef4444";
  const rainColor = "#6366f1";
  const lockedLineColor = "#b91c1c";
  const lockedRainColor = "#1e3a8a";

  const toggleLock = (series: string) => {
    setLockedSeries((prev) => (prev === series ? null : series));
  };

  const onLegendEnter = (series: string) => {
    if (!lockedSeries) setHoverSeries(series);
  };
  const onLegendLeave = () => {
    if (!lockedSeries) setHoverSeries(null);
  };

  const seriesOpacity = (series: string) =>
    effectiveActive && effectiveActive !== series ? 0.25 : 1;
  const areaFillOpacity = (series: string) =>
    effectiveActive && effectiveActive !== series ? 0.06 : 0.22;

  const legendIconColor = (series: "Temp" | "Rain") => {
    if (lockedSeries === series) return series === "Temp" ? lockedLineColor : lockedRainColor;
    return series === "Temp" ? lineColor : rainColor;
  };

  return (
    <div ref={rootRef} className={`relative bg-white rounded-2xl shadow-lg p-4 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 30, left: 0 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={rainColor} stopOpacity={0.9} />
              <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="5 5" />

          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            interval={0}
            tickFormatter={(v) => (legendCollapsed ? "" : formatDate(v))}
          />

          <YAxis
            yAxisId="left"
            orientation="left"
            stroke={lineColor}
            tick={{ fill: lineColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            unit="°C"
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={rainColor}
            tick={{ fill: rainColor, fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            unit="mm"
          />

          <Tooltip
            content={
              <CustomTooltip
                lineColor={lineColor}
                rainColor={rainColor}
                lockedSeries={lockedSeries}
                lockedLineColor={lockedLineColor}
                lockedRainColor={lockedRainColor}
                showDateInTooltip={legendCollapsed}
              />
            }
          />

          <Bar
            yAxisId="right"
            dataKey="Rain"
            name={t("graph.data_keys.rain")}
            fill="url(#colorRain)"
            radius={[10, 10, 0, 0]}
            barSize={20}
            isAnimationActive={false}
            onMouseEnter={() => setHoverSeries("Rain")}
            onMouseLeave={() => setHoverSeries(null)}
            fillOpacity={seriesOpacity("Rain")}
          />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="Temp"
            fill="url(#colorTemp)"
            stroke="none"
            tooltipType="none"
            legendType="none"
            isAnimationActive={false}
            fillOpacity={areaFillOpacity("Temp")}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Temp"
            name={t("graph.data_keys.avg_temp")}
            stroke={lineColor}
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
            isAnimationActive={false}
            onMouseEnter={() => setHoverSeries("Temp")}
            onMouseLeave={() => setHoverSeries(null)}
            strokeOpacity={seriesOpacity("Temp")}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="flex flex-col items-center mt-3">
        <div id="chart-legend" className={`flex items-center gap-6 transition-all duration-150 ${legendCollapsed ? "space-x-3" : ""}`}>
          <button
            type="button"
            onMouseEnter={() => onLegendEnter("Temp")}
            onMouseLeave={onLegendLeave}
            onFocus={() => onLegendEnter("Temp")}
            onBlur={onLegendLeave}
            onClick={() => toggleLock("Temp")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleLock("Temp");
              }
            }}
            aria-pressed={lockedSeries === "Temp"}
            className="flex items-center gap-2 focus:outline-none"
            title={t("graph.data_keys.avg_temp")}
          >
            <span
              style={{
                width: 12,
                height: 12,
                background: legendIconColor("Temp"),
                borderRadius: 9999,
                display: "inline-block",
                opacity: seriesOpacity("Temp"),
                transform: lockedSeries === "Temp" ? "scale(1.05)" : "none",
                transition: "opacity 120ms, transform 120ms, background-color 120ms",
              }}
            />
            {!legendCollapsed && <span className="text-sm text-gray-600">{t("graph.data_keys.avg_temp")}</span>}
            {lockedSeries === "Temp" && !legendCollapsed && <span className="ml-1 text-xs text-red-800">●</span>}
          </button>

          <button
            type="button"
            onMouseEnter={() => onLegendEnter("Rain")}
            onMouseLeave={onLegendLeave}
            onFocus={() => onLegendEnter("Rain")}
            onBlur={onLegendLeave}
            onClick={() => toggleLock("Rain")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleLock("Rain");
              }
            }}
            aria-pressed={lockedSeries === "Rain"}
            className="flex items-center gap-2 focus:outline-none"
            title={t("graph.data_keys.rain")}
          >
            <span
              style={{
                width: 12,
                height: 8,
                background: legendIconColor("Rain"),
                display: "inline-block",
                borderRadius: 3,
                opacity: seriesOpacity("Rain"),
                transform: lockedSeries === "Rain" ? "scale(1.05)" : "none",
                transition: "opacity 120ms, transform 120ms, background-color 120ms",
              }}
            />
            {!legendCollapsed && <span className="text-sm text-gray-600">{t("graph.data_keys.rain")}</span>}
            {lockedSeries === "Rain" && !legendCollapsed && <span className="ml-1 text-xs text-indigo-600">●</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
