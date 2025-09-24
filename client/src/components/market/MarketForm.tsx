import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { indiaData } from "@/store/data/indiaData";
import { useTranslation } from "react-i18next";

interface FormProps {
  onSubmit: (data: {
    state: string;
    district: string;
    commodity: string;
  }) => void;
}

const MarketForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [commodity, setCommodity] = useState("");

  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [districtSuggestions, setDistrictSuggestions] = useState<string[]>([]);
  const [activeStateIndex, setActiveStateIndex] = useState(-1);
  const [activeDistrictIndex, setActiveDistrictIndex] = useState(-1);

  const { t } = useTranslation();

  const formRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const commodityRef = useRef<HTMLInputElement>(null);

  const handleStateChange = (value: string) => {
    setState(value);
    setActiveStateIndex(-1);

    if (value.length > 0) {
      const matches = Object.keys(indiaData).filter((st) =>
        st.toLowerCase().includes(value.toLowerCase())
      );
      setStateSuggestions(matches);
    } else {
      setStateSuggestions([]);
    }

    setDistrict("");
    setDistrictSuggestions([]);
  };

  const handleStateKeyDown = (e: React.KeyboardEvent) => {
    if (stateSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveStateIndex((prev) => (prev < stateSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveStateIndex((prev) => (prev > 0 ? prev - 1 : stateSuggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = activeStateIndex >= 0 ? stateSuggestions[activeStateIndex] : stateSuggestions[0];
      if (selected) {
        setState(selected);
        setStateSuggestions([]);
        setDistrict("");
        districtRef.current?.focus();
      }
    }
  };

  const handleStateSuggestionClick = (s: string) => {
    setState(s);
    setStateSuggestions([]);
    setDistrict("");
    districtRef.current?.focus();
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setActiveDistrictIndex(-1);

    const stateKey = Object.keys(indiaData).find(
      (st) => st.toLowerCase() === state.toLowerCase()
    );

    if (stateKey && value.length > 0) {
      const matches = indiaData[stateKey].filter((dist) =>
        dist.toLowerCase().includes(value.toLowerCase())
      );
      setDistrictSuggestions(matches);
    } else {
      setDistrictSuggestions([]);
    }
  };

  const handleDistrictKeyDown = (e: React.KeyboardEvent) => {
    if (districtSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveDistrictIndex((prev) => (prev < districtSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveDistrictIndex((prev) => (prev > 0 ? prev - 1 : districtSuggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = activeDistrictIndex >= 0 ? districtSuggestions[activeDistrictIndex] : districtSuggestions[0];
      if (selected) {
        setDistrict(selected);
        setDistrictSuggestions([]);
        commodityRef.current?.focus();
      }
    }
  };

  const handleDistrictSuggestionClick = (d: string) => {
    setDistrict(d);
    setDistrictSuggestions([]);
    commodityRef.current?.focus();
  };

  const handleStateFocus = () => setDistrictSuggestions([]);
  const handleDistrictFocus = () => setStateSuggestions([]);
  const handleCommodityFocus = () => {
    setStateSuggestions([]);
    setDistrictSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setStateSuggestions([]);
        setDistrictSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ state, district, commodity });
  };

  return (
    <Card ref={formRef} className="w-full max-w-2xl bg-white/60 shadow-lg rounded-2xl flex flex-col items-center justify-center mt-6 p-6">
      <h2 className="text-3xl font-semibold mb-3 text-center">
        💹 {t("market.form.title")}
      </h2>
      <CardContent className="p-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          
          <div className="relative w-full">
            <Input
              ref={stateRef}
              placeholder={t("market.form.placeholders.state")}
              value={state}
              onChange={(e) => handleStateChange(e.target.value)}
              onKeyDown={handleStateKeyDown}
              onFocus={handleStateFocus}
              // className="w-full border border-green-400 bg-green-50 rounded-lg p-2"
            />
            {stateSuggestions.length > 0 && (
              <ul className="absolute left-0 top-full z-10 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto mt-1">
                {stateSuggestions.map((s, index) => (
                  <li
                    key={s}
                    onClick={() => handleStateSuggestionClick(s)}
                    className={`p-2 cursor-pointer ${
                      index === activeStateIndex ? "bg-green-200" : "hover:bg-green-100"
                    }`}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full">
            <Input
              ref={districtRef}
              placeholder={t("market.form.placeholders.district")}
              value={district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              onKeyDown={handleDistrictKeyDown}
              onFocus={handleDistrictFocus}
              // className="w-full border border-green-400 bg-green-50 rounded-lg p-2"
            />
            {districtSuggestions.length > 0 && (
              <ul className="absolute left-0 top-full z-10 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto mt-1">
                {districtSuggestions.map((d, index) => (
                  <li
                    key={d}
                    onClick={() => handleDistrictSuggestionClick(d)}
                    className={`p-2 cursor-pointer ${
                      index === activeDistrictIndex ? "bg-green-200" : "hover:bg-green-100"
                    }`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Input
            ref={commodityRef}
            placeholder={t("market.form.placeholders.commodity")}
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            onFocus={handleCommodityFocus}
            // className="w-full border border-green-400 bg-green-50 rounded-lg p-2"
          />

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 shadow"
          >
            {t("market.form.search")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketForm;
