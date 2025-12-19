"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import HeaderSection from "../../../components/sections/headerSection/HeaderSection";
import ProductColorSelector from "../../../components/sections/customSection/ProductColorSelector";
import IntroSection from "../../../components/sections/introSection/IntroSection";
import TwoTypeSection from "../../../components/sections/twoTypeSection/TwoTypeSection";
import VideoIntroSection from "../../../components/sections/videoIntroSection/VideoIntroSection";
import BasicSection1 from "../../../components/sections/basicSections/BasicSection1";
import BasicSection2 from "../../../components/sections/basicSections/BasicSection2";
import TechnicalSection from "../../../components/sections/introSection/TechnicalSection";
import HorizontalScroll from "../../../components/sections/introSection/HorizontalScroll";
import FaqSection from "../../../components/sections/faq/FaqSection";
import GallerySection from "../../../components/sections/gallery/GallerySection";
import Footer from "../../../components/footer/Footer";
import ContactForm from "../../../components/formSection/ContactForm";
import ScrollTop from "../../../components/scrollTop/ScrollTop";
import ScrollVideo from "../../../components/scrollVideo/ScrollVideo";
import PricingSection from "../../../components/sections/pricing/PricingSection";
import PlanSection from "../../../components/sections/planSection/PlanSection";
import ManipulateModel from "../../../components/3dmodel/ManipulateModel";
import Yekpare from "../../../components/sections/yekpareSection/Yekpare";
import InnerSideSection from "../../../components/sections/icmekan/InnerSideSection";
import Try from "../../../components/sections/try/Try";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // Lenis'in otomatik olarak animasyonu kontrol etmesini sağla
      duration: 1.1, // Scroll hızı
      easing: (t) => t, // Scroll easing fonksiyonu
      smoothWheel: true, // Mouse wheel scroll'ı smooth hale getir
      smoothTouch: true, // Touch screen scroll'ı smooth hale getir
    });

    function raf(time) {
      lenis.raf(time); // Lenis'in raf fonksiyonunu çalıştır
      requestAnimationFrame(raf); // Bu fonksiyonu sürekli tekrar et
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Component unmount olduğunda Lenis'i yok et
    };
  }, []);

  return (
    <div className="bg-gri flex flex-col overflow-hidden">
      <HeaderSection />
      <ManipulateModel />
      <Try />
      <IntroSection />
      {/* <ScrollVideo /> */}
      <VideoIntroSection />
      <BasicSection1 />
      <TechnicalSection />
      <TwoTypeSection />
      {/* <Yekpare /> */}
      <BasicSection2 />
      {/* <HorizontalScroll /> */}
      <PlanSection />
      <PricingSection />
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
