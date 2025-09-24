import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
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

  const [openState, setOpenState] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);

  const { t } = useTranslation();
  const commodityRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ state, district, commodity });
  };

  const districtsForState = state ? indiaData[state] || [] : [];

  return (
    <Card className="w-full max-w-2xl bg-white/60 shadow-lg rounded-2xl flex flex-col items-center justify-center mt-6 p-6">
      <h2 className="text-3xl font-semibold mb-3 text-center">
        💹 {t("market.form.title")}
      </h2>
      <CardContent className="p-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">

          <Popover open={openState} onOpenChange={setOpenState}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={`w-full justify-between h-11 text-sm font-normal ${
                  state ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {state || t("market.form.placeholders.state")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder={t("market.form.placeholders.state")}
                  className="h-10 text-sm"
                />
                <CommandList>
                  <CommandEmpty>{t("market.form.noResults")}</CommandEmpty>
                  <CommandGroup>
                    {Object.keys(indiaData).map((st) => (
                      <CommandItem
                        key={st}
                        onSelect={() => {
                          setState(st);
                          setDistrict("");
                          setOpenState(false);
                          setTimeout(() => setOpenDistrict(true), 150);
                        }}
                      >
                        {st}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                disabled={!state}
                className={`w-full justify-between h-11 text-sm font-normal ${
                  district ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {district || t("market.form.placeholders.district")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder={t("market.form.placeholders.district")}
                  className="h-10 text-sm"
                />
                <CommandList>
                  <CommandEmpty>{t("market.form.noResults")}</CommandEmpty>
                  <CommandGroup>
                    {districtsForState.map((d) => (
                      <CommandItem
                        key={d}
                        onSelect={() => {
                          setDistrict(d);
                          setOpenDistrict(false);
                          commodityRef.current?.focus();
                        }}
                      >
                        {d}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <input
            ref={commodityRef}
            placeholder={t("market.form.placeholders.commodity")}
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className={`w-full h-11 border border-gray-300 rounded-md px-3 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-green-500 ${
              commodity ? "text-gray-900" : "text-gray-400 placeholder-gray-400"
            }`}
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
