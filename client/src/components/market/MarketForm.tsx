import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface FormProps {
  onSubmit: (data: { state: string; district: string; commodity: string }) => void;
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
    <Card className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input placeholder={t("market.form.placeholders.state")} value={state} onChange={(e) => setState(e.target.value)} />
          <Input placeholder={t("market.form.placeholders.district")}value={district} onChange={(e) => setDistrict(e.target.value)} />
          <Input placeholder={t("market.form.placeholders.commodity")} value={commodity} onChange={(e) => setCommodity(e.target.value)} />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            {t("market.form.search")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MarketForm;
