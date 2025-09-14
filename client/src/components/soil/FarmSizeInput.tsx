import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface FarmSizeInputProps {
  farmSize: string;
  setFarmSize: (val: string) => void;
}

export function FarmSizeInput({ farmSize, setFarmSize }: FarmSizeInputProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">{t("farm_input.label")}</label>
      <Input
        type="text"
        placeholder={t("farm_input.placeholder")}
        value={farmSize}
        onChange={(e) => setFarmSize(e.target.value)}
      />
    </div>
  );
}
