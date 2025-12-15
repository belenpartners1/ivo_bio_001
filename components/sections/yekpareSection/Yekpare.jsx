import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Yekpare = () => {
  const t = useTranslations("yekpare");
  return (
    <div className="w-full md:relative">
      <Image
        src="/ivo_yekpare.png"
        alt="yekpare"
        className="w-full px-10"
        width={1920}
        height={1080}
      />
      <div className="md:absolute md:inset-0 flex items-center justify-center px-10 py-6 md:py-0">
        <h2 className="text-kahverengi text-2xl font-bold text-center font-quicksand">
          {t("yekpareFirst")} <br /> {t("yekpareSecond")}
        </h2>
      </div>
    </div>
  );
};

export default Yekpare;
