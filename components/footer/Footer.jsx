"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const IvoFooter = () => {
  const t = useTranslations("footer");

  return (
    <footer className="w-full bg-[#dbe0e3] p-6 md:p-12 flex justify-center items-center min-h-[500px]">
      <div className="container w-full">
        {/* Üst Metin Alanı */}
        <div className="mb-4 pl-2">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-700 tracking-wide">
            {t("mainTitle")}
          </h2>
          <h3 className=" text-gray-700  text-2xl md:text-4xl mb-4">
            <span className=" text-white">{t("company")}</span>{" "}
            {t("brandSuffix")}
          </h3>
          <p className="text-gray-500 text-sm md:text-base max-w-3xl leading-relaxed">
            {t("description")} <br /> {t("descriptionExtended")}
          </p>
        </div>

        {/* Gri Kart Alanı */}
        <div className="relative overflow-hidden px-4 md:px-32 py-6 md:py-12 md:bg-[url('/6.png')] md:bg-contain md:bg-center md:bg-no-repeat">
          <div className="flex flex-col md:flex-row h-full ">
            {/* SOL TARAFTAKİ İÇERİK (İletişim & Sosyal Medya) */}
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-8 md:space-y-0">
              {/* Sosyal Medya İkonları */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/company/belenandpartners/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg transition-colors text-gri hover:text-gray-700"
                >
                  <FaLinkedinIn size={30} />
                </a>
                <a
                  href="https://www.instagram.com/ivomodular/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg transition-colors text-gri hover:text-gray-700"
                >
                  <FaInstagram size={30} />
                </a>
                <a
                  href="https://www.facebook.com/ivomodular/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg transition-colors text-gri hover:text-gray-700"
                >
                  <FaFacebookF size={30} />
                </a>
                <a
                  href="https://www.youtube.com/@ivo_moduler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-2 rounded-lg transition-colors text-gri hover:text-gray-700"
                >
                  <FaYoutube size={30} />
                </a>
              </div>

              {/* Küçük Logo (BELEN & PARTNERS) */}

              <div className="opacity-60 mt-4 md:mt-20">
                <Image
                  src="/belen_logo_beyaz.png"
                  alt="Logo"
                  width={150}
                  height={67}
                />
              </div>

              {/* İletişim Bilgileri Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-500 text-xs">
                {/* Adres */}
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-end justify-center gap-1">
                    <FaMapMarkerAlt
                      className="text-white text-lg mb-1"
                      size={36}
                    />
                    <p className=" text-white md:text-lg">
                      {t("addressLabel")}
                    </p>
                  </div>
                  <div>
                    <p className="leading-snug text-left">
                      {t("addressValue")}
                    </p>
                  </div>
                </div>

                {/* Mail */}
                <div className="flex flex-col items-start md:items-center gap-2">
                  <div className="flex items-end justify-center gap-1">
                    <FaEnvelope className="text-white text-lg mb-1" size={36} />
                    <p className=" text-white md:text-lg">{t("emailLabel")}</p>
                  </div>
                  <div>
                    <a
                      href={`mailto:${t("emailValue")}`}
                      className="leading-snug hover:text-gray-700"
                    >
                      {t("emailValue")}
                    </a>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-end justify-center gap-1">
                    <FaPhoneAlt className="text-white text-lg mb-1" size={36} />
                    <p className=" text-white md:text-lg">{t("phoneLabel")}</p>
                  </div>
                  <div>
                    <a
                      href={`tel:${t("phoneValue").replace(/\s/g, "")}`}
                      className="leading-snug hover:text-gray-700"
                    >
                      {t("phoneValue")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ORTA AYIRAÇ (Çizgi) */}
            <div className="hidden md:block w-[2] bg-white mx-8 opacity-50 relative"></div>

            {/* SAĞ TARAFTAKİ İÇERİK (Büyük Logo) */}
            <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0 relative">
              {/* Buraya IVO Bio logosunu Image ile koymalısın. Şimdilik Text ile simüle ettim */}
              {/* Logo Görseli Kullanımı için (Yorumu kaldırıp kullan): */}
              {/* <div className="w-full h-full relative min-h-[200px]">
<Image 
                  src="/path/to/ivo-logo.png" 
                  alt="IVO Bio Logo" 
                  layout="fill" 
                  objectFit="contain"
                />
</div> 
              */}

              {/* CSS ile Logo Simülasyonu (Resim yoksa bu görünür) */}
              <div className="text-white text-[100px] md:text-[160px] font-serif leading-none tracking-tighter flex items-end opacity-90 select-none">
                <Image
                  src="/ivo_cercevesiz_beyaz.png"
                  alt="Logo"
                  width={280}
                  height={67}
                  className="w-40 md:w-80 lg:w-[400px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-400/30 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default IvoFooter;
