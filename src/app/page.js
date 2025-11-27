// "use client";

// import HeaderSection from "../../components/sections/headerSection/HeaderSection";
// import ProductColorSelector from "../../components/sections/customSection/ProductColorSelector";
// import IntroSection from "../../components/sections/introSection/IntroSection";
// import TwoTypeSection from "../../components/sections/twoTypeSection/TwoTypeSection";
// import VideoIntroSection from "../../components/sections/videoIntroSection/VideoIntroSection";
// import BasicSection1 from "../../components/sections/basicSections/BasicSection1";
// import BasicSection2 from "../../components/sections/basicSections/BasicSection2";
// import TechnicalSection from "../../components/sections/introSection/TechnicalSection";
// import HorizontalScroll from "../../components/sections/introSection/HorizontalScroll";

// import Lenis from "lenis";
// import { useEffect } from "react";

// const Home = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       autoRaf: true,
//     });

//     lenis.on("scroll", (e) => {
//       console.log(e);
//     });

//     return () => {
//       lenis.destroy();
//     };
//   }, []);
//   return (
//     <div className="bg-gri flex flex-col">
//       <HeaderSection />
//       <IntroSection />
//       <VideoIntroSection />
//       <BasicSection1 />
//       <TechnicalSection />
//       <TwoTypeSection />
//       <BasicSection2 />
//       <HorizontalScroll />
//       <ProductColorSelector />
//       <div className="min-h-screen w-full bg-bej"></div>
//       <div className="min-h-screen w-full bg-yesil"></div>
//       <div className="min-h-screen w-full bg-gri"></div>
//       <div className="min-h-screen w-full bg-kahverengi"></div>
//       <div className="min-h-screen w-full bg-sari"></div>
//     </div>
//   );
// };

// export default Home;

"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import HeaderSection from "../../components/sections/headerSection/HeaderSection";
import ProductColorSelector from "../../components/sections/customSection/ProductColorSelector";
import IntroSection from "../../components/sections/introSection/IntroSection";
import TwoTypeSection from "../../components/sections/twoTypeSection/TwoTypeSection";
import VideoIntroSection from "../../components/sections/videoIntroSection/VideoIntroSection";
import BasicSection1 from "../../components/sections/basicSections/BasicSection1";
import BasicSection2 from "../../components/sections/basicSections/BasicSection2";
import TechnicalSection from "../../components/sections/introSection/TechnicalSection";
import HorizontalScroll from "../../components/sections/introSection/HorizontalScroll";
import FaqSection from "../../components/sections/faq/FaqSection";
import GallerySection from "../../components/sections/gallery/GallerySection";
import Footer from "../../components/footer/Footer";

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
    <div className="bg-gri flex flex-col">
      <HeaderSection />
      <IntroSection />
      <VideoIntroSection />
      <BasicSection1 />
      <TechnicalSection />
      <TwoTypeSection />
      <BasicSection2 />
      {/* <HorizontalScroll /> */}
      <GallerySection />
      <ProductColorSelector />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Home;
