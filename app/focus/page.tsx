'use client';

import BlurText from "@/components/ReactBits/BlurText";
import {Select, SelectItem, Button} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const mode = [
  {key: "IT", label: "Italian Only", description: "Only Italian people can be selected"},
  {key: "europe", label: "Europe", description: "Only European people can be selected"},
  {key: "asia", label: "Asia", description: "Only Asian people can be selected"},
  {key: "africa", label: "Africa", description: "Only African people can be selected"},
  {key: "north-america", label: "North America", description: "Only North American people can be selected"},
  {key: "south-america", label: "South America", description: "Only South American people can be selected"},
  {key: "world", label: "Worldwide", description: "All people can be selected"},
];

export default function RevealPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("IT");
  const modeDescription = mode.find(m => m.key === selectedMode)?.description ?? "";

  const startQuiz = () => {
    router.push(`/focus/quiz?mode=${selectedMode}`);
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <BlurText
          text="Choose quiz mode"
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
        label="Choose mode"
        placeholder="Select a mode"
        >
          {mode.map((mode) => (
            <SelectItem key={mode.key}>{mode.label}</SelectItem>
          ))}
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
