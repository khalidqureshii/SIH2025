import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ state, district, commodity });
  };

  return (
    <Card className="w-full max-w-2xl backdrop-blur-xl bg-white/60 shadow-lg rounded-2xl flex items-center justify-center flex-col mt-6 p-6">
      <h2 className="text-3xl font-semibold mb-3 text-center">
        💹 {t("market.form.title")}
      </h2>
      <CardContent className="p-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Input
            placeholder={t("market.form.placeholders.state")}
            value={state}
            onChange={(e) => setState(e.target.value)}
            // className="w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Input
            placeholder={t("market.form.placeholders.district")}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            // className="w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Input
            placeholder={t("market.form.placeholders.commodity")}
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            // className="w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Button
            type="submit"
            className="w-full mx-auto block   bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 shadow transition"
          >
            {t("market.form.search")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketForm;
