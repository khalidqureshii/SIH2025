import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface LocationInputProps {
  latitude: string;
  longitude: string;
  setLatitude: (val: string) => void;
  setLongitude: (val: string) => void;
}

export function LocationInput({ latitude, longitude, setLatitude, setLongitude }: LocationInputProps) {

  const { t } = useTranslation();

  return (
    <div className="flex flex-row mb-8">
      <div className="mr-4 w-1/2">
      <label className="block text-sm font-medium mb-2">{t("location_input.labels.latitude")}</label>
      <Input
        type="text"
        placeholder={t("location_input.placeholders.latitude")}
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      </div>
      <div className="mr-4 w-1/2">
      <label className="block text-sm font-medium mb-2">{t("location_input.labels.longitude")}</label>
      <Input
        type="text"
        placeholder={t("location_input.placeholders.latitude")}
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      </div>
    </div>
  );
}
