import { useEffect } from "react";
import i18n from "i18next";
import { rtlLanguages } from "../../rtlLanguages";

const DirectionHandler = () => {
  useEffect(() => {
    const handleDirection = (lng: string) => {
      const dir = rtlLanguages.includes(lng) ? "rtl" : "ltr";
      document.documentElement.dir = dir;
      document.body.dir = dir;
    };

    handleDirection(i18n.language);

    i18n.on("languageChanged", handleDirection);

    return () => {
      i18n.off("languageChanged", handleDirection);
    };
  }, []);

  return null;
};

export default DirectionHandler;
