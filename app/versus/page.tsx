"use client";

import BlurText from "@/components/ReactBits/BlurText";
import {Select, SelectItem, Button} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTranslation } from "react-i18next";

export default function VersusPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("IT");
  const [selectedEvent, setSelectedEvent] = useState("333");
  const [selectedResult, setSelectedResult] = useState("single");

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
  const event = [
    {key: "333", label: "3x3x3 Cube"},
    {key: "222", label: "2x2x2 Cube"},
    {key: "444", label: "4x4x4 Cube"},
    {key: "555", label: "5x5x5 Cube"},
    {key: "666", label: "6x6x6 Cube"},
    {key: "777", label: "7x7x7 Cube"},
    {key: "333bf", label: "3x3x3 Blindfolded"},
    {key: "333fm", label: "3x3x3 Fewest Moves"},
    {key: "333oh", label: "3x3x3 One-Handed"},
    {key: "clock", label: "Clock"},
    {key: "minx", label: "Megaminx"},
    {key: "pyram", label: "Pyraminx"},
    {key: "skewb", label: "Skewb"},
    {key: "sq1", label: "Square-1"}
  ];

  const modeDescription = modality.find(m => m.key === selectedMode)?.description ?? "";

  const startQuiz = () => {
    router.push(`/versus/quiz?mode=${selectedMode}&event=${selectedEvent}&result=${selectedResult}`);
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <BlurText
          text={t("versus_choose")}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-6xl justify-center items-center"
      />

      <div className="flex justify-center lg:gap-15 gap-5 w-full mt-15 lg:flex-row flex-col items-center lg:items-start">
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
        <Select
        isRequired
        className="max-w-xs"
        onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            setSelectedEvent(value);
        }}
        defaultSelectedKeys={["333"]}
        disallowEmptySelection={true}
        label={t("form_event")}
        placeholder={t("form_event_placeholder")}
        startContent={<span className={`cubing-icon event-${selectedEvent}`}></span>}
        >
          {event.map((event) => (
            <SelectItem key={event.key} textValue={event.label}><span className={`cubing-icon event-${event.key}`}></span>{event.label}</SelectItem>
          ))}
        </Select>
        <Select
        isRequired
        className="max-w-xs"
        onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            setSelectedResult(value);
        }}
        defaultSelectedKeys={["single"]}
        disallowEmptySelection={true}
        label={t("form_result")}
        placeholder={t("form_result_placeholder")}
        >
          <SelectItem key="single">{t("single")}</SelectItem>
          <SelectItem key="average">{t("average")}</SelectItem>
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
