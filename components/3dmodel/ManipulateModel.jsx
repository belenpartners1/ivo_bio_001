"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

function Model() {
  const { scene } = useGLTF("/3dmodels/ivo_bio_3d2.glb");
  return <primitive object={scene} scale={1} />;
}

export default function ManipulateModel() {
  const t = useTranslations("manipulateModel");
  const sections = [
    {
      titleKey: "modernDesign.title",
      descriptionKey: "modernDesign.description",
    },
    {
      titleKey: "modularSystem.title",
      descriptionKey: "modularSystem.description",
    },
    {
      titleKey: "highTechnology.title",
      descriptionKey: "highTechnology.description",
    },
  ];

  return (
    <div className="w-full h-screen flex bg-white overflow-hidden">
      {/* 3D Canvas - Sol taraf (3/4) */}
      <div
        className="w-3/4 h-full relative"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        <Canvas camera={{ position: [-8, 6, 14], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Suspense fallback={null}>
            <Model />
            <Environment preset="sunset" />
          </Suspense>

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.5}
          />
        </Canvas>

        {/* Kontrol bilgisi */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <img
            src="/360degree.gif"
            alt="Döndürülebilir"
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Sidebar - Sağ taraf (1/4) */}
      <div className="w-1/4 h-full rounded-l-[3rem] shadow-2xl overflow-y-auto bg-gri font-quicksand">
        <div className="min-h-full flex flex-col justify-center p-8 py-8 space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              {/* Title */}
              <h2 className="text-white text-4xl font-bold mb-2 leading-tight">
                {t(section.titleKey)}
              </h2>

              {/* Description */}
              <p className="leading-relaxed text-2xl text-kahverengi">
                {t(section.descriptionKey)}
              </p>

              {/* Decorative line */}
              <div className="mt-6 w-16 h-1 rounded-full"></div>

              {/* Separator (not on last item) */}
              {index < sections.length - 1 && (
                <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
