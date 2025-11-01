"use client";

import { Select, SelectItem, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BlurText from "@/components/ReactBits/BlurText";
import { useTranslation } from "react-i18next";

export default function RevealPage() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState("md");
  const {t} = useTranslation();

  const difficulty = [
    {key: "ez", label: t("goldrush_ez"), description: t("goldrush_ez_desc")},
    {key: "md", label: t("goldrush_md"), description: t("goldrush_md_desc")},
    {key: "hd", label: t("goldrush_hd"), description: t("goldrush_hd_desc")},
  ]

  const difficultyDescription = difficulty.find(d => d.key === selectedDifficulty)?.description ?? "";

  const startQuiz = () => {
    router.push(`/goldrush/${selectedDifficulty}`);
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <BlurText
          text={t("goldrush_choose")}
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
            setSelectedDifficulty(value);
        }}
        description={difficultyDescription}
        defaultSelectedKeys={["md"]}
        disallowEmptySelection={true}
        label={t("form_difficulty")}
        placeholder={t("form_difficulty_placeholder")}
        >
          {difficulty.map((difficulty) => (
            <SelectItem key={difficulty.key}>{difficulty.label}</SelectItem>
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
