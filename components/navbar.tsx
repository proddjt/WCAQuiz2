"use client";
import PillNav from './ReactBits/PillNav';
import logo from '@/public/World_Cube_Association_Logo.png'
import { usePathname } from 'next/navigation';

export default function Navbar({quiz}: {quiz: string}) {
  const pathname = usePathname();
  return (
    <PillNav
      logo={logo.src}
      logoAlt="Company Logo"
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

