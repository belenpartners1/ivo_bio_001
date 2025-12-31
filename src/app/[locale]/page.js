"use client";

// import { useEffect } from "react";
// import Lenis from "lenis";
import HeaderSection from "../../../components/sections/headerSection/HeaderSection";
import ProductColorSelector from "../../../components/sections/customSection/ProductColorSelector";
import IntroSection from "../../../components/sections/introSection/IntroSection";
import TwoTypeSection from "../../../components/sections/twoTypeSection/TwoTypeSection";
import VideoIntroSection from "../../../components/sections/videoIntroSection/VideoIntroSection";
import BasicSection1 from "../../../components/sections/basicSections/BasicSection1";
import BasicSection2 from "../../../components/sections/basicSections/BasicSection2";
import TechnicalSection from "../../../components/sections/introSection/TechnicalSection";
import FaqSection from "../../../components/sections/faq/FaqSection";
import GallerySection from "../../../components/sections/gallery/GallerySection";
import Footer from "../../../components/footer/Footer";
import ContactForm from "../../../components/formSection/ContactForm";
import ScrollTop from "../../../components/scrollTop/ScrollTop";
import PlanSection from "../../../components/sections/planSection/PlanSection";
import ManipulateModel from "../../../components/3dmodel/ManipulateModel";
import InnerSideSection from "../../../components/sections/icmekan/InnerSideSection";

const Home = () => {
  return (
    <div className="bg-gri flex flex-col overflow-hidden gap-40">
      <HeaderSection />
      <div className="hidden md:block">
        <ManipulateModel />
      </div>
      <IntroSection />
      <VideoIntroSection />
      {/* <div className="w-full h-40"></div> */}
      <BasicSection1 />
      {/* <div className="w-full h-40"></div> */}
      <TechnicalSection />
      {/* <div className="w-full h-40"></div> */}
      <TwoTypeSection />
      {/* <div className="w-full h-40"></div> */}
      <BasicSection2 />
      {/* <div className="w-full h-40"></div> */}
      <PlanSection />
      <InnerSideSection />
      {/* <ProductColorSelector /> */}
      <ContactForm />
      <GallerySection />
      <FaqSection />
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Home;
