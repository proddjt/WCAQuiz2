"use client";

import { Link } from "@heroui/link";
import BlurText from "@/components/ReactBits/BlurText";
import HomepageCard from "@/components/homepage-card";
import Logo from "@/public/wcaquiz_logo.png"
import Versus from "@/public/versus.png"
import Focus from "@/public/focus.png"
import Reveal from "@/public/reveal.png"
import '@/styles/homepage.css';


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 w-screen h-full">
      <div className="flex flex-col items-center max-w-5xl text-center justify-center">
        <img src={Logo.src} alt="WCAQuiz logo" className="w-1/2 floating-img"/>
        <BlurText
          text="Welcome to WCAQuiz"
          animateBy="words"
          direction="top"
          className="text-6xl md:text-8xl justify-center items-center"
        />
      </div>

      <div className="text-center">
        <p className="text-muted-foreground text-2xl">Choose a quiz mode</p>
      </div>

      <div className="mt-10 flex gap-4 lg:flex-row flex-col">
        <Link href="/reveal" className="text-center">
          <HomepageCard title="Reveal" description="This is the classic quiz mode. You will have 10 attempts to correctly guess a WCA person. Hints will appear at every wrong attempt" image={Reveal.src} />
        </Link>
        <Link href="/focus" className="text-center">
          <HomepageCard title="Focus" description="This quiz is based on WCA images. You will have a completely blurred person image and 5 attempts to correctly guess a WCA person. Hints and less-blurry image will be given at every wrong attempt" image={Focus.src} />
        </Link>
        <Link href="/versus" className="text-center">
          <HomepageCard title="Versus" description="Classic higher or lower quiz. You can choose a WCA event and person will appear. You will have to choose if the person on the right has an higher or lower official average time on that event" image={Versus.src} />
        </Link>
      </div>
    </section>
  );
}
