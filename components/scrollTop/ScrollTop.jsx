import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FiArrowUp } from "react-icons/fi";

gsap.registerPlugin(ScrollToPlugin);

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Scroll pozisyonuna göre butonun görünürlüğünü kontrol et
    const toggleVisibility = () => {
      // Mobilde 100px, tablet ve üstünde 300px
      const threshold = window.innerWidth < 768 ? 100 : 300;

      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      if (isVisible) {
        // Butonu göster - GSAP animasyonu ile
        gsap.to(buttonRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else {
        // Butonu gizle
        gsap.to(buttonRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // GSAP ScrollToPlugin ile smooth scroll
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: "power3.inOut",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-50 opacity-0 cursor-pointer group"
      aria-label="Yukarı git"
    >
      <FiArrowUp
        className="text-black/80 transform group-hover:-translate-y-1 transition-transform duration-300"
        size={24}
      />
    </button>
  );
};

export default ScrollTop;
