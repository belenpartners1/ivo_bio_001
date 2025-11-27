"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap"; // GSAP'i içe aktar
import { TiThMenu } from "react-icons/ti";

const AdvertiseHeader = () => {
  // Menünün açık/kapalı durumunu yönetmek için state
  const [isOpen, setIsOpen] = useState(false);

  // Menü içeriği (görseldeki Türkçe kelimeler)
  const menuItems = [
    "İVO BİO Nedir?",
    "Tanıtım Filmi",
    "İVO BİO Teknik",
    "Galeri",
    "Sıkça Sorulan Sorular",
    "İletişim",
  ];

  // Menü kapsayıcısı için useRef
  const menuRef = useRef(null);

  // Menü animasyonunu yöneten fonksiyon
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // isOpen state'i her değiştiğinde animasyonu çalıştır
  useEffect(() => {
    const menuElement = menuRef.current;

    if (isOpen) {
      // Açılma animasyonu
      // Menünün yüksekliğini otomatik ayarla ve görünür yap
      gsap.to(menuElement, {
        duration: 0.5,
        height: "auto", // Yüksekliği otomatik olarak içeriğe göre ayarla
        opacity: 1,
        ease: "power3.out",
        // display: "block" (GSAP bunu genellikle handle eder, ama Tailwind'de flex/block kullanıyorsak ekleyebiliriz)
      });
      // Menü içindeki öğeleri de sırayla canlandır
      gsap.fromTo(
        menuElement.querySelectorAll("div"), // Menü içindeki her bir öğeyi seç
        {
          opacity: 0,
          y: 10,
        },
        {
          duration: 0.3,
          opacity: 1,
          y: 0,
          stagger: 0.1, // Öğeler arasında kısa bir gecikme
          ease: "sine.out",
          delay: 0.2, // Ana menü açıldıktan sonra başlasın
        }
      );
    } else {
      // Kapanma animasyonu
      gsap.to(menuElement, {
        duration: 0.4,
        height: 0, // Yüksekliği sıfıra indir
        opacity: 0, // Şeffaflığı sıfıra indir
        ease: "power3.inOut",
        // overwrite: "auto"
      });
    }
  }, [isOpen]);

  return (
    <div className="w-full flex flex-col fixed top-0 z-50">
      <div className="w-full">
        <div className=" flex justify-between items-center p-6">
          {/* Sol Kısım: Logo */}
          <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl border border-white/20 ">
            <Image
              src="/ivo_bio_logoSVG_v2.svg"
              alt="Logo"
              width={160}
              height={160}
              className="px-4 py-2"
            />
          </div>

          {/* Sağ Kısım: Yolculuğumuz (Ana Menü Tetikleyici) */}
          <div className="flex flex-col items-end relative">
            <button
              onClick={toggleMenu}
              className={`bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl border border-gri p-4 text-black cursor-pointer transition-colors duration-200 
                ${isOpen ? "bg-white/20 border-white/40" : "hover:bg-white/15"} 
                focus:outline-none focus:ring-2 focus:ring-gri`}
            >
              <TiThMenu size={20} color="gray" />
            </button>

            {/* Animasyonlu Menü İçeriği */}
            <div
              ref={menuRef}
              style={{ height: 0, opacity: 0 }} // Başlangıçta gizli ve yüksekliği sıfır
              className="absolute top-full mt-2 w-auto min-w-[160px] overflow-hidden 
                         bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20"
            >
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 text-black font-quicksand font-semibold text-center cursor-pointer whitespace-nowrap hover:bg-white/20 transition-colors duration-150 border-b  last:border-b-0 border-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseHeader;
