'use client';

import BlurText from "@/components/ReactBits/BlurText";
import {Select, SelectItem, Button} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RevealPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("IT");
  const [selectedDifficulty, setSelectedDifficulty] = useState("md");

  const modality = [
      {key: "IT", label: "Italian Only", description: "Only Italian people will be shown"},
      {key: "europe", label: "Europe", description: "Only European people will be shown"},
      {key: "asia", label: "Asia", description: "Only Asian people will be shown"},
      {key: "africa", label: "Africa", description: "Only African people will be shown"},
      {key: "north-america", label: "North America", description: "Only North American people will be shown"},
      {key: "south-america", label: "South America", description: "Only South American people will be shown"},
      {key: "world", label: "Worldwide", description: "All people will be shown"},
    ];
  const difficulty = [
    {key: "ez", label: "Easy", description: "The person selected must have minimum 30 competitions and must be NR20 or less in an event at least."},
    {key: "md", label: "Medium", description: "The person selected must have minimum 20 competitions and must be between NR21 and NR50 in an event at least."},
    {key: "hd", label: "Hard", description: "The person selected must have minimum 15 competitions and must be between NR51 and NR100 in an event at least."},
  ]
  
  const modeDescription = modality.find(m => m.key === selectedMode)?.description ?? "";
  const difficultyDescription = difficulty.find(d => d.key === selectedDifficulty)?.description ?? "";

  const startQuiz = () => {
    router.push(`/reveal/quiz?mode=${selectedMode}&difficulty=${selectedDifficulty}`);
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <BlurText
          text="Choose mode and difficulty"
          animateBy="words"
          direction="top"
          className="text-3xl md:text-6xl justify-center items-center"
      />

      <div className="flex justify-center lg:gap-15 gap-10 w-full mt-15 lg:flex-row flex-col items-center lg:items-start">
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
            setSelectedDifficulty(value);
        }}
        description={difficultyDescription}
        defaultSelectedKeys={["md"]}
        disallowEmptySelection={true}
        label="Choose difficulty"
        placeholder="Select a difficulty"
        >
          {difficulty.map((difficulty) => (
            <SelectItem key={difficulty.key}>{difficulty.label}</SelectItem>
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
