"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TiThMenu } from "react-icons/ti";
import { BsDownload } from "react-icons/bs";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from "next-intl";

const AdvertiseHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("header");

  // Menü öğeleri - artık obje formatında ve id içeriyor
  const menuItems = [
    {
      name: t("menu.whatIsIvoBio"),
      id: "intro",
    },
    {
      name: t("menu.promotionalFilm"),
      id: "tanitim-filmi",
    },
    {
      name: t("menu.ivoBioTechnical"),
      id: "teknik",
    },
    {
      name: t("menu.ivoBioPlan"),
      id: "plan",
    },
    {
      name: t("menu.ivoBioModels"),
      id: "modeller",
    },
    // {
    //   name: t("menu.ivoBioPersonal"),
    //   id: "kisisel",
    // },
    {
      name: t("menu.contact"),
      id: "iletisim",
    },
    {
      name: t("menu.gallery"),
      id: "galeri",
    },
    {
      name: t("menu.faq"),
      id: "sss",
    },
    // {
    //   name: t("menu.downloadCatalog"),
    //   id: "katalog",
    //   isDownload: true,
    // },
  ];

  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

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

  // PDF indirme fonksiyonu
  const handleDownloadCatalog = () => {
    const link = document.createElement("a");
    link.href = "/ivo_katalog.pdf";
    link.download = "ivo_katalog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Menüyü kapat
    setIsOpen(false);
  };

  // Menü öğesi tıklama işleyicisi
  const handleMenuItemClick = (item) => {
    if (item.isDownload) {
      handleDownloadCatalog();
    } else {
      handleScrollToSection(item.id);
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

  // Click outside handler - menü dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full flex flex-col fixed top-0 z-50">
      <div className="w-full">
        <div className="flex justify-between items-center px-2 sm:px-4 md:px-6 py-2">
          {/* Sol Kısım: Logo */}
          <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-xl border border-white/20">
            <Image
              src="/ivo_bio_logoSVG_v2.svg"
              alt="Logo"
              width={160}
              height={160}
              className="px-8 py-2"
            />

            {/* <Image
              src="/ivo_siyah.png"
              alt="Logo"
              width={200}
              height={160}
              className=""
            /> */}
          </div>

          {/* <Image
            src="/icons/light_icon.png"
            alt="Logo"
            width={240}
            height={160}
            className="w-32 h-auto sm:w-48 md:w-60"
          /> */}

          {/* Sağ Kısım: Menü Butonu */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0">
            {/* Download Button */}
            <button
              onClick={handleDownloadCatalog}
              className="flex items-center gap-2 px-2 sm:px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all shadow-lg duration-200 border border-gri cursor-pointer focus:outline-none"
            >
              <BsDownload size={20} className="text-black/80" />
              <span className="hidden sm:inline text-black/80 font-quicksand font-semibold whitespace-nowrap">
                {t("downloadButton")}
              </span>
            </button>

            <LanguageSwitcher />
            <div
              ref={menuContainerRef}
              className="flex flex-col items-end relative"
            >
              <button
                onClick={toggleMenu}
                className={`flex items-center gap-2 px-2 sm:px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all shadow-lg duration-200 border border-gri cursor-pointer
                ${isOpen ? "bg-white/20" : ""}
                focus:outline-none`}
              >
                <TiThMenu size={20} className="text-black/80" />
              </button>

              {/* Animasyonlu Menü İçeriği */}
              <div
                ref={menuRef}
                style={{ height: 0, opacity: 0 }}
                className="absolute top-full mt-2 w-auto min-w-[160px] overflow-hidden
                         bg-white/10 backdrop-blur-sm shadow-lg rounded-lg border border-gri"
              >
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleMenuItemClick(item)}
                    className="p-4 text-black/80 font-quicksand font-semibold text-center cursor-pointer whitespace-nowrap hover:bg-white/20 transition-all duration-200 border-b last:border-b-0 border-gri"
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
