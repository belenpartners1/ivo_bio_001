"use client";

import HeaderSection from "../../components/sections/headerSection/HeaderSection";
import ProductColorSelector from "../../components/sections/customSection/ProductColorSelector";
import IntroSection from "../../components/sections/introSection/IntroSection";
import TwoTypeSection from "../../components/sections/twoTypeSection/TwoTypeSection";
import VideoIntroSection from "../../components/sections/videoIntroSection/VideoIntroSection";
import BasicSection1 from "../../components/sections/basicSections/BasicSection1";
import BasicSection2 from "../../components/sections/basicSections/BasicSection2";

import Lenis from "lenis";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div className="bg-gri flex flex-col">
      <HeaderSection />
      <IntroSection />
      <VideoIntroSection />
      <BasicSection1 />
      <TwoTypeSection />
      <BasicSection2 />
      <ProductColorSelector />
      <div className="min-h-screen w-full bg-bej"></div>
      <div className="min-h-screen w-full bg-yesil"></div>
      <div className="min-h-screen w-full bg-gri"></div>
      <div className="min-h-screen w-full bg-kahverengi"></div>
      <div className="min-h-screen w-full bg-sari"></div>
    </div>
  );
};

export default Home;
