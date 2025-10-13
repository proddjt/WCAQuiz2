"use client";
import { usePathname } from "next/navigation";
import PillNav from "./ReactBits/PillNav";
import logo from "@/public/logo_little.png"
import { useTranslation } from "react-i18next";

export default function Navbar({quiz}: {quiz: string}) {
  const pathname = usePathname();
  const {t} = useTranslation();
  return (
    <PillNav
      logo={logo.src}
      logoAlt="WCAQuiz Logo"
      items={[
        { label: t("home"), href: '/' },
        { label: t("change_mode"), href: `/${quiz}` }
      ]}
      ease="power2.easeOut"
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#000000"
      initialLoadAnimation
    />
  )
}

