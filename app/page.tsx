"use client";

import { Link } from "@heroui/link";
import BlurText from "@/components/ReactBits/BlurText";
import HomepageCard from "@/components/homepage-card";
import Logo from "@/public/wcaquiz_logo.png"
import Versus from "@/public/versus.jpeg"
import Focus from "@/public/focus.jpeg"
import Reveal from "@/public/reveal.jpeg"
import '@/styles/homepage.css';


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 w-screen h-full">
      <div className="flex flex-col items-center max-w-5xl text-center justify-center">
        <img src={Logo.src} alt="WCAQuiz logo" className="lg:w-1/2 w-8/10 floating-img" title="WCAQuiz logo"/>
        <BlurText
          text="Welcome to WCAQuiz"
          animateBy="words"
          direction="top"
          className="text-6xl md:text-8xl justify-center items-center"
        />
        <h2 className="mt-2 mb-8 lg:text-lg text-sm italic font-semibold">How much do you know about World Cubing Association? Choose between 3 different quiz modes and see how well you know your WCA friends!</h2>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground text-2xl">Choose a quiz mode</p>
      </div>

      <div className="mt-5 flex gap-8 lg:flex-row flex-col">
        <Link href="/reveal" className="text-center">
          <HomepageCard title="Reveal" description="This is the classic quiz mode. You will have 10 attempts to correctly guess a WCA person. Hints will appear at every wrong attempt" image={Reveal.src} animation="float-breeze"/>
        </Link>
        <Link href="/focus" className="text-center">
          <HomepageCard title="Focus" description="This quiz is based on WCA images. You will have a completely blurred person image and 5 attempts to correctly guess a WCA person. Hints and less-blurry image will be given at every wrong attempt" image={Focus.src} animation="gentle-drift"/>
        </Link>
        <Link href="/versus" className="text-center">
          <HomepageCard title="Versus" description="Sort of higher or lower quiz. You can choose a WCA event and person will appear. You will have to choose if the person on the right has a lower official average or single time on that event" image={Versus.src} animation="wind-sway"/>
        </Link>
      </div>
    </section>
  );
}
