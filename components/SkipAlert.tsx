import {Alert} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function SkipAlert({isSkip} : {isSkip: boolean}) {
  const {t} = useTranslation();
  return (
    <div className={`transition-all duration-500 ease-in-out ${isSkip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"} flex items-center justify-center fixed lg:bottom-20 lg:right-20 bottom-5 right-5`}> 
      <Alert description={t("skip_alert_desc")} title={t("skip_alert_heading")} color="primary"/>
    </div>
  );
}