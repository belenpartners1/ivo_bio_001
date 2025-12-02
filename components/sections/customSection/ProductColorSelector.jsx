"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductColorSelector = () => {
  const [color, setColor] = useState("blue");
  const containerRef = useRef(null);

  const variants = {
    blue: "/blue.webp",
    brown: "/brown.webp",
    pink: "/pink.webp",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full grid grid-cols-3 place-items-center bg-gri font-quicksand"
      id="kisisel"
    >
      {/* Product Image */}
      <div className="w-full h-screen relative col-span-2">
        <img
          src={variants[color]}
          alt="product"
          className="w-full h-full object-cover transition-all duration-300 rounded-r-4xl"
        />
      </div>

      <div className="h-screen flex flex-col gap-4 text-center items-center justify-between col-span-1 text-gray-500 px-4 py-60">
        {/* Product Name */}
        <h1 className="text-4xl font-bold ">
          İVO BİO'yu Kendi Zevkine Göre Baştan Yarat <br /> İVO BİO'nu
          Özelleştir
        </h1>
        <div className="bg-white w-full h-[1px]"></div>
        <p className="text-2xl text-left font-medium">
          Lütfen Kabin Renginizi Seciniz
        </p>
        <p className="text-lg text-left">
          Yaşadığınız yeri renklendirin, ruhunuzu ortaya koyun. Kabin renginiz,
          iç dünyanızı dışa yansıtan bir dokunuş olsun.
        </p>

        {/* Color Options */}
        <div className="flex gap-4">
          {Object.keys(variants).map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-14 h-14 rounded-2xl border cursor-pointer
              ${color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductColorSelector;
