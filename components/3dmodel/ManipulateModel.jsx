"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const { scene } = useGLTF("/3dmodels/output/IVO_Remesh_3.gltf");
  return <primitive object={scene} scale={1} />;
}

export default function ManipulateModel() {
  const t = useTranslations("manipulateModel");
  const controlsRef = useRef();
  const sectionRef = useRef();
  const canvasRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobil cihaz kontrolü
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%", // Ekran yüksekliği kadar pin'li kalır
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });

    return () => {
      window.removeEventListener("resize", checkMobile);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !canvasRef.current) return;

    const canvasContainer = canvasRef.current;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      // Slider üzerinde yapılan dokunuşları kontrol et
      const target = e.target;
      const isSlider = target.classList.contains('slider') ||
                       target.closest('.slider-container');

      // Eğer slider'a dokunuluyorsa, hiçbir şey yapma (slider'ın kendi işlevselliği çalışsın)
      if (isSlider) {
        return;
      }

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = Math.abs(touchEndX - touchStartX);
      const deltaY = Math.abs(touchEndY - touchStartY);

      // Yatay hareket daha fazlaysa (sağa-sola), scroll'u engelle
      if (deltaX > deltaY) {
        e.preventDefault();
      }
      // Dikey hareket daha fazlaysa (yukarı-aşağı), scroll devam etsin
    };

    canvasContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    canvasContainer.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      canvasContainer.removeEventListener("touchstart", handleTouchStart);
      canvasContainer.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile]);

  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e.target.value);
    setZoomLevel(newZoom);
    if (controlsRef.current) {
      controlsRef.current.object.zoom = newZoom;
      controlsRef.current.object.updateProjectionMatrix();
    }
  };

  return (
    <div ref={sectionRef} className="w-full h-screen flex bg-white overflow-hidden rounded-b-4xl">
      <div ref={canvasRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [-8, 6, 14], fov: 60 }} className="z-10">
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Suspense fallback={null}>
            <Model />
            <Environment preset="sunset" />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minPolarAngle={isMobile ? Math.PI / 3 : Math.PI / 6}
            maxPolarAngle={isMobile ? Math.PI / 3 : Math.PI / 2}
            rotateSpeed={0.5}
            touches={{
              ONE: isMobile ? 2 : 0, // Mobilde tek parmak ile sadece yatay döndürme
              TWO: 0,
            }}
          />
        </Canvas>

        <div className="absolute w-3/4 left-1/2 transform -translate-x-1/2 top-24 flex items-center font-quicksand opacity-20 ">
          <Image
            src="/logo_yesil_buyuk.png"
            alt="logo"
            width={2200}
            height={2200}
          />
        </div>

        {/* Zoom Control Slider */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-4 font-quicksand z-20 slider-container">
          <span className="font-quicksand font-semibold text-gray-700 whitespace-nowrap">
            {t("zoomOut")}
          </span>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoomLevel}
              onChange={handleZoomChange}
              className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #a4b49f 0%, #a4b49f ${
                  ((zoomLevel - 0.5) / 2.5) * 100
                }%, #e5e7eb ${((zoomLevel - 0.5) / 2.5) * 100}%, #e5e7eb 100%)`,
              }}
            />
            <div
              className="absolute w-5 h-5 bg-yesil rounded-full shadow-md pointer-events-none"
              style={{
                left: `calc(${((zoomLevel - 0.5) / 2.5) * 100}% - 10px)`,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <span className="font-quicksand font-semibold text-gray-700 whitespace-nowrap">
            {t("zoomIn")}
          </span>
        </div>

        {/* Slider Styles */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            border-radius: 50%;
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: transparent;
            cursor: pointer;
            border: none;
            border-radius: 50%;
          }
        `}</style>
      </div>
    </div>
  );
}
