"use client";

import BlurText from "@/components/ReactBits/BlurText";
import {Select, SelectItem, Button} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function VersusPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("IT");
  const [selectedEvent, setSelectedEvent] = useState("333");
  const [selectedResult, setSelectedResult] = useState("single");

  const modality = [
    {key: "IT", label: "Italian Only", description: "Only Italian people can be selected"},
    {key: "europe", label: "Europe", description: "Only European people can be selected"},
    {key: "asia", label: "Asia", description: "Only Asian people can be selected"},
    {key: "africa", label: "Africa", description: "Only African people can be selected"},
    {key: "north-america", label: "North America", description: "Only North American people can be selected"},
    {key: "south-america", label: "South America", description: "Only South American people can be selected"},
    {key: "world", label: "Worldwide", description: "All people can be selected"},
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
          text="Choose quiz mode and event"
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
        label="Choose mode"
        placeholder="Select a mode"
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
        label="Choose event"
        placeholder="Select an event"
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
        label="Choose result type"
        placeholder="Select a type"
        >
          <SelectItem key="single">Single</SelectItem>
          <SelectItem key="average">Average</SelectItem>
        </Select>
      </div>
      <div className="flex justify-center w-full">
        <Button color="primary" className="lg:w-1/4 w-1/2 lg:mt-0 mt-5" variant="ghost" onPress={startQuiz}>
          Start quiz
        </Button>
      </div>
    </div>
  );
}
