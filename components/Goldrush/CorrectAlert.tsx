import {Alert} from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function CorrectAlert({isCorrect, podiumsLeft} : {isCorrect: boolean, podiumsLeft: number}) {
  const {t} = useTranslation();
  return (
    <div className={`transition-all duration-500 ease-in-out ${isCorrect ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"} flex items-center justify-center fixed lg:bottom-20 lg:right-20 bottom-5 right-5`}> 
      <Alert description={t("gr_correct_alert_desc", { number: podiumsLeft })} title={t("gr_correct_alert_heading")} color="success"/>
    </div>
  );
}