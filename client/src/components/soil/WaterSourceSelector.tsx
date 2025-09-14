import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface WaterSourceSelectorProps {
  waterSource: string;
  setWaterSource: (val: string) => void;
}

export function WaterSourceSelector({ waterSource, setWaterSource }: WaterSourceSelectorProps) {

  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-2">{t("water_selector.labels.waterSource")}</label>
      <Select onValueChange={(val) => { setWaterSource(val); }}>
        <SelectTrigger>
          <SelectValue placeholder={waterSource || t("water_selector.placeholders.chooseWaterSource")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Canal">{t("water_selector.options.canal")}</SelectItem>
          <SelectItem value="Borewell">{t("water_selector.options.borewell")}</SelectItem>
          <SelectItem value="Rainfall">{t("water_selector.options.rainfall")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
