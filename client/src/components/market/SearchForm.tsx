import React from "react";
import MarketLabel from "@/components/market/MarketLabel";
import FieldWrap from "@/components/market/FieldWrap";
import { Check } from "lucide-react";

type Props = {
  stateValue: string;
  districtValue: string;
  commodityValue: string;
  stateOptions: string[];
  districtOptions: string[];
  commodityOptions: string[];
  onChange: (p: { state?: string; district?: string; commodity?: string }) => void;
  onClear?: () => void;
};

const SearchForm: React.FC<Props> = ({ stateValue, districtValue, commodityValue, stateOptions, districtOptions, commodityOptions, onChange, onClear }) => {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Find Markets & Prices</h2>
            <p className="text-sm text-slate-500">Select a State, District and Commodity to see market-level prices.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onClear && onClear()}
              className="text-sm px-3 py-1 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow hover:brightness-95"
            >
              <Check size={16} />
              Show
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FieldWrap>
            <MarketLabel>State</MarketLabel>
            <select
              value={stateValue}
              onChange={(e) => onChange({ state: e.target.value, district: "" })}
              className="w-full rounded-md border border-slate-200 px-3 py-2 bg-white text-sm"
            >
              <option value="">Select state</option>
              {stateOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap>
            <MarketLabel>District</MarketLabel>
            <select
              value={districtValue}
              onChange={(e) => onChange({ district: e.target.value })}
              className="w-full rounded-md border border-slate-200 px-3 py-2 bg-white text-sm"
              disabled={!stateValue}
            >
              <option value="">Select district</option>
              {districtOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </FieldWrap>

          <FieldWrap>
            <MarketLabel>Commodity</MarketLabel>
            <select
              value={commodityValue}
              onChange={(e) => onChange({ commodity: e.target.value })}
              className="w-full rounded-md border border-slate-200 px-3 py-2 bg-white text-sm"
            >
              <option value="">Select commodity</option>
              {commodityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FieldWrap>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
