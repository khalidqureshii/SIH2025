import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface SoilSelectorProps {
  soilType: string;
  setSoilType: (val: string) => void;
}

export function SoilSelector({ soilType, setSoilType }: SoilSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-2">
        {t("soil_selector.labels.soilSource")}
      </label>
      <Select
        onValueChange={(val) => {
          setSoilType(val);
        }}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              soilType || t("soil_selector.placeholders.chooseSoilType")
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectContent>
            <SelectItem value="Clay">
              {t("soil_selector.options.clay")}
            </SelectItem>
            <SelectItem value="Sandy">
              {t("soil_selector.options.sandy")}
            </SelectItem>
            <SelectItem value="Loamy">
              {t("soil_selector.options.loamy")}
            </SelectItem>
            <SelectItem value="Silty">
              {t("soil_selector.options.silty")}
            </SelectItem>
            <SelectItem value="Peaty">
              {t("soil_selector.options.peaty")}
            </SelectItem>
            <SelectItem value="Chalky">
              {t("soil_selector.options.chalky")}
            </SelectItem>
          </SelectContent>
        </SelectContent>
      </Select>
    </div>
  );
}
