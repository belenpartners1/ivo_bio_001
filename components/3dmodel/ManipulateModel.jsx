// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import { Suspense, useRef, useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Model() {
//   const { scene } = useGLTF("/3dmodels/output/IVO_Remesh_3.gltf");
//   return <primitive object={scene} scale={1} />;
// }

// export default function ManipulateModel() {
//   const t = useTranslations("manipulateModel");
//   const controlsRef = useRef();
//   const sectionRef = useRef();
//   const canvasRef = useRef();
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     // Mobil cihaz kontrolü
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     const section = sectionRef.current;
//     if (!section) return;

//     ScrollTrigger.create({
//       trigger: section,
//       start: "top top",
//       end: "+=100%", // Ekran yüksekliği kadar pin'li kalır
//       pin: true,
//       pinSpacing: true,
//       scrub: 1,
//     });

//     return () => {
//       window.removeEventListener("resize", checkMobile);
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   useEffect(() => {
//     if (!isMobile || !canvasRef.current) return;

//     const canvasContainer = canvasRef.current;
//     let touchStartX = 0;
//     let touchStartY = 0;
//     let isRotating = false;

//     const handleTouchStart = (e) => {
//       // Slider üzerinde yapılan dokunuşları kontrol et
//       const target = e.target;
//       const isSlider = target.classList.contains('slider') ||
//                        target.closest('.slider-container');

//       if (isSlider) {
//         isRotating = false;
//         return;
//       }

//       touchStartX = e.touches[0].clientX;
//       touchStartY = e.touches[0].clientY;
//       isRotating = false;
//     };

//     const handleTouchMove = (e) => {
//       // Slider üzerinde yapılan dokunuşları kontrol et
//       const target = e.target;
//       const isSlider = target.classList.contains('slider') ||
//                        target.closest('.slider-container');

//       // Eğer slider'a dokunuluyorsa, hiçbir şey yapma (slider'ın kendi işlevselliği çalışsın)
//       if (isSlider) {
//         return;
//       }

//       const touchEndX = e.touches[0].clientX;
//       const touchEndY = e.touches[0].clientY;
//       const deltaX = Math.abs(touchEndX - touchStartX);
//       const deltaY = Math.abs(touchEndY - touchStartY);

//       // Eğer kullanıcı belirgin şekilde yatay hareket yapıyorsa rotasyon aktif olsun
//       // Daha yüksek threshold ile sadece gerçekten yatay kaydırmalarda aktif olsun
//       if (!isRotating && deltaX > 20 && deltaX > deltaY * 2) {
//         isRotating = true;
//       }

//       // Sadece rotasyon aktifse ve yatay hareket daha fazlaysa scroll'u engelle
//       if (isRotating && deltaX > deltaY * 1.5) {
//         e.preventDefault();
//       }
//       // Dikey hareket daha fazlaysa veya rotasyon aktif değilse, scroll devam etsin
//     };

//     const handleTouchEnd = () => {
//       isRotating = false;
//     };

//     canvasContainer.addEventListener("touchstart", handleTouchStart, {
//       passive: true,
//     });
//     canvasContainer.addEventListener("touchmove", handleTouchMove, {
//       passive: false,
//     });
//     canvasContainer.addEventListener("touchend", handleTouchEnd, {
//       passive: true,
//     });

//     return () => {
//       canvasContainer.removeEventListener("touchstart", handleTouchStart);
//       canvasContainer.removeEventListener("touchmove", handleTouchMove);
//       canvasContainer.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [isMobile]);

//   const handleZoomChange = (e) => {
//     const newZoom = parseFloat(e.target.value);
//     setZoomLevel(newZoom);
//     if (controlsRef.current) {
//       controlsRef.current.object.zoom = newZoom;
//       controlsRef.current.object.updateProjectionMatrix();
//     }
//   };

//   return (
//     <div ref={sectionRef} className="w-full h-screen flex bg-white overflow-hidden rounded-b-4xl">
//       <div ref={canvasRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
//         <Canvas camera={{ position: [-8, 6, 14], fov: 60 }} className="z-10">
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} intensity={1} />

//           <Suspense fallback={null}>
//             <Model />
//             <Environment preset="sunset" />
//           </Suspense>

//           <OrbitControls
//             ref={controlsRef}
//             enableZoom={false}
//             enablePan={false}
//             enableRotate={true}
//             minPolarAngle={isMobile ? Math.PI / 3 : Math.PI / 6}
//             maxPolarAngle={isMobile ? Math.PI / 3 : Math.PI / 2}
//             rotateSpeed={0.5}
//           />
//         </Canvas>

//         <div className="absolute w-3/4 left-1/2 transform -translate-x-1/2 top-24 flex items-center font-quicksand opacity-20 ">
//           <Image
//             src="/logo_yesil_buyuk.png"
//             alt="logo"
//             width={2200}
//             height={2200}
//           />
//         </div>

//         {/* Zoom Control Slider */}
//         <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-4 font-quicksand z-20 slider-container">
//           <span className="font-quicksand font-semibold text-gray-700 whitespace-nowrap">
//             {t("zoomOut")}
//           </span>
//           <div className="relative flex items-center">
//             <input
//               type="range"
//               min="0.5"
//               max="3"
//               step="0.1"
//               value={zoomLevel}
//               onChange={handleZoomChange}
//               className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//               style={{
//                 background: `linear-gradient(to right, #a4b49f 0%, #a4b49f ${
//                   ((zoomLevel - 0.5) / 2.5) * 100
//                 }%, #e5e7eb ${((zoomLevel - 0.5) / 2.5) * 100}%, #e5e7eb 100%)`,
//               }}
//             />
//             <div
//               className="absolute w-5 h-5 bg-yesil rounded-full shadow-md pointer-events-none"
//               style={{
//                 left: `calc(${((zoomLevel - 0.5) / 2.5) * 100}% - 10px)`,
//                 top: "50%",
//                 transform: "translateY(-50%)",
//               }}
//             />
//           </div>
//           <span className="font-quicksand font-semibold text-gray-700 whitespace-nowrap">
//             {t("zoomIn")}
//           </span>
//         </div>

//         {/* Slider Styles */}
//         <style jsx>{`
//           .slider::-webkit-slider-thumb {
//             -webkit-appearance: none;
//             appearance: none;
//             width: 20px;
//             height: 20px;
//             background: transparent;
//             cursor: pointer;
//             border-radius: 50%;
//           }
//           .slider::-moz-range-thumb {
//             width: 20px;
//             height: 20px;
//             background: transparent;
//             cursor: pointer;
//             border: none;
//             border-radius: 50%;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 3 farklı model
const models = [
  { path: "/3dmodels/output/Scale_2.gltf", name: "IVO Maxi Comfort" },
  { path: "/3dmodels/output/IVO_Remesh_3.gltf", name: "IVO Comfort" },
  { path: "/3dmodels/output/Scale_1.gltf", name: "IVO Twin Comfort" },
];

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
}

export default function ManipulateModel() {
  const t = useTranslations("manipulateModel");
  const controlsRef = useRef();
  const sectionRef = useRef();
  const canvasRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [currentModelIndex, setCurrentModelIndex] = useState(1); // Ortadaki model (Standard)

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
    let isRotating = false;

    const handleTouchStart = (e) => {
      // Slider üzerinde yapılan dokunuşları kontrol et
      const target = e.target;
      const isSlider =
        target.classList.contains("slider") ||
        target.closest(".slider-container");

      if (isSlider) {
        isRotating = false;
        return;
      }

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isRotating = false;
    };

    const handleTouchMove = (e) => {
      // Slider üzerinde yapılan dokunuşları kontrol et
      const target = e.target;
      const isSlider =
        target.classList.contains("slider") ||
        target.closest(".slider-container");

      // Eğer slider'a dokunuluyorsa, hiçbir şey yapma (slider'ın kendi işlevselliği çalışsın)
      if (isSlider) {
        return;
      }

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = Math.abs(touchEndX - touchStartX);
      const deltaY = Math.abs(touchEndY - touchStartY);

      // Eğer kullanıcı belirgin şekilde yatay hareket yapıyorsa rotasyon aktif olsun
      // Daha yüksek threshold ile sadece gerçekten yatay kaydırmalarda aktif olsun
      if (!isRotating && deltaX > 20 && deltaX > deltaY * 2) {
        isRotating = true;
      }

      // Sadece rotasyon aktifse ve yatay hareket daha fazlaysa scroll'u engelle
      if (isRotating && deltaX > deltaY * 1.5) {
        e.preventDefault();
      }
      // Dikey hareket daha fazlaysa veya rotasyon aktif değilse, scroll devam etsin
    };

    const handleTouchEnd = () => {
      isRotating = false;
    };

    canvasContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    canvasContainer.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    canvasContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      canvasContainer.removeEventListener("touchstart", handleTouchStart);
      canvasContainer.removeEventListener("touchmove", handleTouchMove);
      canvasContainer.removeEventListener("touchend", handleTouchEnd);
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

  const handlePrevModel = () => {
    setCurrentModelIndex((prev) => (prev === 0 ? models.length - 1 : prev - 1));
  };

  const handleNextModel = () => {
    setCurrentModelIndex((prev) => (prev === models.length - 1 ? 0 : prev + 1));
  };

  // Modellerin indekslerini hesapla
  const leftModelIndex =
    currentModelIndex === 0 ? models.length - 1 : currentModelIndex - 1;
  const rightModelIndex =
    currentModelIndex === models.length - 1 ? 0 : currentModelIndex + 1;

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen flex bg-white overflow-hidden rounded-b-4xl"
    >
      <div
        ref={canvasRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
      >
        {/* Sol Model (Küçük) */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 opacity-50 hover:opacity-75 transition-opacity cursor-pointer z-30 bg-gri/30 rounded-3xl"
          onClick={handlePrevModel}
        >
          <Canvas camera={{ position: [-8, 6, 15], fov: 90 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Model modelPath={models[leftModelIndex].path} />
              <Environment preset="sunset" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-quicksand">
            {models[leftModelIndex].name}
          </div>
        </div>

        {/* Orta Model (Büyük - Döndürülebilir) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10">
          <Canvas camera={{ position: [-8, 6, 14], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Suspense fallback={null}>
              <Model modelPath={models[currentModelIndex].path} />
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
            />
          </Canvas>
        </div>

        {/* Sağ Model (Küçük) */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 opacity-50 hover:opacity-75 transition-opacity cursor-pointer z-30 bg-gri/30 rounded-3xl"
          onClick={handleNextModel}
        >
          <Canvas camera={{ position: [-8, 6, 15], fov: 90 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Model modelPath={models[rightModelIndex].path} />
              <Environment preset="sunset" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-quicksand">
            {models[rightModelIndex].name}
          </div>
        </div>

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
