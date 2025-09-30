"use client";
import { usePathname } from "next/navigation";
import PillNav from "./ReactBits/PillNav";
import logo from "@/public/logo_little.png"

export default function Navbar({quiz}: {quiz: string}) {
  const pathname = usePathname();
  return (
    <PillNav
      logo={logo.src}
      logoAlt="WCAQuiz Logo"
      items={[
        { label: 'Home', href: '/' },
        { label: 'Change mode', href: `/${quiz}` }
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

