"use client";

import { Select, SelectItem, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BlurText from "@/components/ReactBits/BlurText";
import { useTranslation } from "react-i18next";

export default function RevealPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("IT");
  const {t} = useTranslation();

  const modality = [
    {key: "IT", label: "Italian Only", description: t("it_desc")},
    {key: "europe", label: "Europe", description: t("eu_desc")},
    {key: "asia", label: "Asia", description: t("as_desc")},
    {key: "africa", label: "Africa", description: t("af_desc")},
    {key: "north-america", label: "North America", description: t("na_desc")},
    {key: "south-america", label: "South America", description: t("sa_desc")},
    {key: "world", label: "Worldwide", description: t("world_desc")},
  ];

  const modeDescription = modality.find(m => m.key === selectedMode)?.description ?? "";

  const startQuiz = () => {
    router.push(`/focus/${selectedMode}`);
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <BlurText
          text={t("focus_choose")}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-6xl justify-center items-center"
      />

      <div className="flex justify-center gap-15 w-full mt-15">
        <Select
        isRequired
        className="max-w-xs"
        onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            setSelectedMode(value);
        }}
        description={modeDescription}
        defaultSelectedKeys={["IT"]}
        disallowEmptySelection={true}
        label={t("form_mode")}
        placeholder={t("form_mode_placeholder")}
        >
          {modality.map((mode) => (
            <SelectItem key={mode.key}>{mode.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-center w-full">
        <Button color="primary" className="lg:w-1/4 w-1/2 lg:mt-0 mt-5" variant="ghost" onPress={startQuiz}>
          {t("start")}
        </Button>
      </div>
    </div>
  );
}
