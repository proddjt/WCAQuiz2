"use client";

import { useTranslation } from "react-i18next";
import { Link } from "@heroui/link";
import BlurText from "@/components/ReactBits/BlurText";
import HomepageCard from "@/components/homepage-card";
import Logo from "@/public/wcaquiz_logo.png"
import Versus from "@/public/versus.jpeg"
import Focus from "@/public/focus.jpeg"
import Reveal from "@/public/reveal.jpeg"
import Goldrush from '@/public/goldrush.jpeg'
import '@/styles/homepage.css';


export default function Home() {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 w-screen h-full">
      <div className="flex flex-col items-center max-w-5xl text-center justify-center">
        <img src={Logo.src} alt="WCAQuiz logo" className="lg:w-1/2 w-8/10 floating-img" title="WCAQuiz logo"/>
        <BlurText
          text={t("main_title")}
          animateBy="words"
          direction="top"
          className="text-6xl md:text-8xl justify-center items-center"
        />
        <h2 className="mt-2 mb-8 lg:text-lg text-sm italic font-semibold">{t("main_subtitle")}</h2>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground text-2xl">{t("choose_mode")}</p>
      </div>

      <div className="mt-5 flex gap-8 lg:flex-row flex-col">
        <Link href="/reveal" className="text-center">
          <HomepageCard title="Reveal" description={t("reveal_desc")} image={Reveal.src} animation="float-breeze"/>
        </Link>
        <Link href="/focus" className="text-center">
          <HomepageCard title="Focus" description={t("focus_desc")} image={Focus.src} animation="gentle-drift"/>
        </Link>
        <Link href="/versus" className="text-center">
          <HomepageCard title="Versus" description={t("versus_desc")} image={Versus.src} animation="wind-sway"/>
        </Link>
        <Link href="/goldrush" className="text-center">
          <HomepageCard title="Goldrush" description={t("goldrush_desc")} image={Goldrush.src} animation="float-breeze"/>
        </Link>
      </div>
    </section>
  );
}
