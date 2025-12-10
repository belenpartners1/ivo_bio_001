"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TiThMenu } from "react-icons/ti";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from "next-intl";

const AdvertiseHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("header.menu");

  // Menü öğeleri - artık obje formatında ve id içeriyor
  const menuItems = [
    {
      name: t("whatIsIvoBio"),
      id: "intro",
    },
    {
      name: t("promotionalFilm"),
      id: "tanitim-filmi",
    },
    {
      name: t("ivoBioTechnical"),
      id: "teknik",
    },
    {
      name: t("ivoBioPlan"),
      id: "plan",
    },
    {
      name: t("ivoBioModels"),
      id: "modeller",
    },
    {
      name: t("ivoBioPersonal"),
      id: "kisisel",
    },
    {
      name: t("contact"),
      id: "iletisim",
    },
    {
      name: t("gallery"),
      id: "galeri",
    },
    {
      name: t("faq"),
      id: "sss",
    },
  ];

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scroll fonksiyonu
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Menüyü kapat
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const menuElement = menuRef.current;

    if (isOpen) {
      gsap.to(menuElement, {
        duration: 0.5,
        height: "auto",
        opacity: 1,
        ease: "power3.out",
      });
      gsap.fromTo(
        menuElement.querySelectorAll("div"),
        {
          opacity: 0,
          y: 10,
        },
        {
          duration: 0.3,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "sine.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menuElement, {
        duration: 0.4,
        height: 0,
        opacity: 0,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="w-full flex flex-col fixed top-0 z-50">
      <div className="w-full">
        <div className="flex justify-between items-center px-6 py-2">
          {/* Sol Kısım: Logo */}
          {/* <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-4xl border border-white/20">
            <Image
              src="/ivo_bio_logoSVG_v2.svg"
              alt="Logo"
              width={160}
              height={160}
              className="px-4 py-2"
            /> 

             <Image
              src="/icons/light_icon.png"
              alt="Logo"
              width={240}
              height={160}
              className=""
            />
          </div> */}
          <Image
            src="/icons/light_icon.png"
            alt="Logo"
            width={240}
            height={160}
          />

          {/* Sağ Kısım: Menü Butonu */}
          <div className="flex items-center justify-center gap-4">
            <LanguageSwitcher />
            <div className="flex flex-col items-end relative">
              <button
                onClick={toggleMenu}
                className={`bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl border border-gri p-4 text-black cursor-pointer transition-colors duration-200 
                ${isOpen ? "bg-white/20 border-white/40" : "hover:bg-white/15"} 
                focus:outline-none focus:ring-2 focus:ring-gri`}
              >
                <TiThMenu size={20} className="text-black/80" />
              </button>

              {/* Animasyonlu Menü İçeriği */}
              <div
                ref={menuRef}
                style={{ height: 0, opacity: 0 }}
                className="absolute top-full mt-2 w-auto min-w-[160px] overflow-hidden 
                         bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20"
              >
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleScrollToSection(item.id)}
                    className="p-4 text-black font-quicksand font-semibold text-center cursor-pointer whitespace-nowrap hover:bg-white/20 transition-colors duration-150 border-b last:border-b-0 border-black"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseHeader;
