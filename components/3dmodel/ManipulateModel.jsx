"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function Model() {
  const { scene } = useGLTF("/3dmodels/ivo_bio_3d2.glb");
  return <primitive object={scene} scale={1} />;
}

export default function ManipulateModel() {
  const t = useTranslations("manipulateModel");
  const controlsRef = useRef();
  const [zoomLevel, setZoomLevel] = useState(1);

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

  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e.target.value);
    setZoomLevel(newZoom);
    if (controlsRef.current) {
      controlsRef.current.object.zoom = newZoom;
      controlsRef.current.object.updateProjectionMatrix();
    }
  };

  return (
    <div className="w-full h-screen flex bg-white overflow-hidden">
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [-8, 6, 14], fov: 60 }}>
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
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            rotateSpeed={0.5}
          />
        </Canvas>

        {/* Zoom Control Slider */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-4">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Uzaklaş
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
                background: `linear-gradient(to right, #1f2937 0%, #1f2937 ${((zoomLevel - 0.5) / 2.5) * 100}%, #e5e7eb ${((zoomLevel - 0.5) / 2.5) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div
              className="absolute w-5 h-5 bg-gray-800 rounded-full shadow-md pointer-events-none"
              style={{
                left: `calc(${((zoomLevel - 0.5) / 2.5) * 100}% - 10px)`,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Yakınlaş
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
