// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import { Suspense } from "react";

// function Model() {
//   const { scene } = useGLTF("/3dmodels/ivo_bio_3d.glb");
//   return <primitive object={scene} scale={1} />;
// }

// export default function ManipulateModel() {
//   return (
//     <div
//       //   style={{ width: "100%", height: "600px" }}
//       className="bg-white h-screen"
//     >
//       <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />

//         <Suspense fallback={null}>
//           <Model style={{ cursor: "pointer" }} />
//           <Environment preset="sunset" />
//         </Suspense>

//         {/* Mouse ile döndürme kontrolü */}
//         <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
//       </Canvas>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import { Suspense, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Model() {
//   const { scene } = useGLTF("/3dmodels/ivo_bio_3d.glb");
//   return <primitive object={scene} scale={1} />;
// }

// export default function ManipulateModel() {
//   const containerRef = useRef(null);
//   const sidebarRef = useRef(null);

//   const sections = [
//     {
//       highlight: "İNOVASYON",
//       title: "Biyoteknoloji Çözümleri",
//       description:
//         "Modern biyoteknoloji ile doğayı bir araya getiren yenilikçi çözümlerimiz, sürdürülebilir bir gelecek için tasarlandı.",
//     },
//     {
//       highlight: "TEKNOLOJİ",
//       title: "İleri Düzey Araştırma",
//       description:
//         "Laboratuvarlarımızda geliştirdiğimiz son teknoloji ürünler, endüstride yeni standartlar belirliyor.",
//     },
//     {
//       highlight: "SÜRDÜRÜLEBİLİRLİK",
//       title: "Çevre Dostu Üretim",
//       description:
//         "Doğaya saygılı üretim süreçlerimizle, gelecek nesillere yaşanabilir bir dünya bırakıyoruz.",
//     },
//   ];

//   useEffect(() => {
//     if (!sidebarRef.current) return;

//     // Sidebar container animasyonu
//     gsap.fromTo(
//       sidebarRef.current,
//       {
//         x: 100,
//         opacity: 0,
//       },
//       {
//         x: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top center",
//           toggleActions: "play none none reverse",
//         },
//       }
//     );

//     // Her section için ayrı animasyon
//     sections.forEach((_, index) => {
//       gsap.fromTo(
//         `.content-section-${index}`,
//         {
//           y: 50,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           delay: 0.2 + index * 0.2,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top center",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-screen flex bg-white overflow-hidden"
//     >
//       {/* 3D Canvas - Sol taraf (3/4) */}
//       <div
//         className="w-3/4 h-full relative"
//         onWheel={(e) => {
//           e.stopPropagation();
//         }}
//       >
//         <Canvas camera={{ position: [-10, 4, 8], fov: 60 }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} intensity={1} />

//           <Suspense fallback={null}>
//             <Model />
//             <Environment preset="sunset" />
//           </Suspense>

//           <OrbitControls
//             enableZoom={true}
//             enablePan={true}
//             enableRotate={true}
//             zoomSpeed={0.5}
//           />
//         </Canvas>

//         {/* Kontrol bilgisi */}
//       </div>

//       {/* Sidebar - Sağ taraf (1/4) */}
//       <div
//         ref={sidebarRef}
//         className="w-1/4 h-full rounded-l-[3rem] shadow-2xl overflow-hidden bg-gri font-quicksand"
//       >
//         <div className="h-full flex flex-col justify-center p-8 space-y-12">
//           {sections.map((section, index) => (
//             <div
//               key={index}
//               className={`content-section-${index} opacity-0 transform`}
//             >
//               {/* Highlight badge */}
//               <div className="mb-3">
//                 <span className="inline-block  text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
//                   {section.highlight}
//                 </span>
//               </div>

//               {/* Title */}
//               <h2 className="text-white text-2xl font-bold mb-4 leading-tight">
//                 {section.title}
//               </h2>

//               {/* Description */}
//               <p className="text-white text leading-relaxed">
//                 {section.description}
//               </p>

//               {/* Decorative line */}
//               <div className="mt-6 w-16 h-1 rounded-full"></div>

//               {/* Separator (not on last item) */}
//               {index < sections.length - 1 && (
//                 <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
// import { Suspense, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Model() {
//   const { scene } = useGLTF("/3dmodels/ivo_bio_3d.glb");
//   return <primitive object={scene} scale={1} />;
// }

// export default function ManipulateModel() {
//   const containerRef = useRef(null);
//   const sidebarRef = useRef(null);

//   const sections = [
//     {
//       highlight: "İNOVASYON",
//       title: "Biyoteknoloji Çözümleri",
//       description:
//         "Modern biyoteknoloji ile doğayı bir araya getiren yenilikçi çözümlerimiz, sürdürülebilir bir gelecek için tasarlandı.",
//     },
//     {
//       highlight: "TEKNOLOJİ",
//       title: "İleri Düzey Araştırma",
//       description:
//         "Laboratuvarlarımızda geliştirdiğimiz son teknoloji ürünler, endüstride yeni standartlar belirliyor.",
//     },
//     {
//       highlight: "SÜRDÜRÜLEBİLİRLİK",
//       title: "Çevre Dostu Üretim",
//       description:
//         "Doğaya saygılı üretim süreçlerimizle, gelecek nesillere yaşanabilir bir dünya bırakıyoruz.",
//     },
//   ];

//   // useEffect(() => {
//   //   if (!sidebarRef.current) return;

//   //   // Sidebar container animasyonu
//   //   gsap.fromTo(
//   //     sidebarRef.current,
//   //     {
//   //       x: 100,
//   //       opacity: 0,
//   //     },
//   //     {
//   //       x: 0,
//   //       opacity: 1,
//   //       duration: 1,
//   //       ease: "power3.out",
//   //       scrollTrigger: {
//   //         trigger: containerRef.current,
//   //         start: "top center",
//   //         toggleActions: "play none none reverse",
//   //       },
//   //     }
//   //   );

//   //   // Her section için ayrı animasyon
//   //   sections.forEach((_, index) => {
//   //     gsap.fromTo(
//   //       `.content-section-${index}`,
//   //       {
//   //         x: 40,
//   //         opacity: 0,
//   //       },
//   //       {
//   //         x: 0,
//   //         opacity: 1,
//   //         duration: 0.2,
//   //         delay: 0.1 + index * 0.1,
//   //         ease: "power2.out",
//   //         scrollTrigger: {
//   //           trigger: containerRef.current,
//   //           start: "top center",
//   //           toggleActions: "play none none reverse",
//   //         },
//   //       }
//   //     );
//   //   });

//   //   return () => {
//   //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   //   };
//   // }, []);

//   useEffect(() => {
//     if (!sidebarRef.current) return;

//     //Sidebar container animasyonu - sadece bir kez oynar
//     gsap.fromTo(
//       sidebarRef.current,
//       {
//         x: 100,
//         opacity: 0,
//       },
//       {
//         x: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//       }
//     );

//     //Her section için ayrı animasyon - sadece bir kez oynar
//     sections.forEach((_, index) => {
//       gsap.fromTo(
//         `.content-section-${index}`,
//         {
//           x: 40,
//           opacity: 0,
//         },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.6,
//           delay: 0.3 + index * 0.2,
//           ease: "power2.out",
//         }
//       );
//     });
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-screen flex bg-white overflow-hidden"
//     >
//       {/* 3D Canvas - Sol taraf (3/4) */}
//       <div
//         className="w-3/4 h-full relative"
//         onWheel={(e) => {
//           e.stopPropagation();
//         }}
//       >
//         <Canvas camera={{ position: [-10, 4, 8], fov: 60 }}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} intensity={1} />

//           <Suspense fallback={null}>
//             <Model />
//             <Environment preset="sunset" />
//           </Suspense>

//           <OrbitControls
//             enableZoom={true}
//             enablePan={true}
//             enableRotate={true}
//             zoomSpeed={0.5}
//           />
//         </Canvas>

//         {/* Kontrol bilgisi */}
//         <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
//           <img
//             src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3Y5aHZ0Ym0zZGFkOHRqYzVoZ3czOHZ0YjZsaGQwYzN0aGd0NzRwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlTy9x8FZo0XO1i/giphy.gif"
//             alt="Döndürülebilir"
//             className="w-20 h-20 opacity-70"
//           />
//         </div>
//       </div>

//       {/* Sidebar - Sağ taraf (1/4) */}
//       <div
//         ref={sidebarRef}
//         className="w-1/4 h-full rounded-l-[3rem] shadow-2xl overflow-y-auto bg-gri font-quicksand"
//       >
//         <div className="min-h-full flex flex-col justify-center p-8 py-16 space-y-12">
//           {sections.map((section, index) => (
//             <div
//               key={index}
//               className={`content-section-${index} opacity-0 transform`}
//             >
//               {/* Title */}
//               <h2 className="text-white text-2xl font-bold mb-4 leading-tight">
//                 {section.title}
//               </h2>

//               {/* Description */}
//               <p className="text-white text leading-relaxed">
//                 {section.description}
//               </p>

//               {/* Decorative line */}
//               <div className="mt-6 w-16 h-1 rounded-full"></div>

//               {/* Separator (not on last item) */}
//               {index < sections.length - 1 && (
//                 <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//////

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/3dmodels/ivo_bio_3d.glb");
  return <primitive object={scene} scale={1} />;
}

export default function ManipulateModel() {
  const sections = [
    {
      highlight: "İNOVASYON",
      title: "Biyoteknoloji Çözümleri",
      description:
        "Modern biyoteknoloji ile doğayı bir araya getiren yenilikçi çözümlerimiz, sürdürülebilir bir gelecek için tasarlandı.",
    },
    {
      highlight: "TEKNOLOJİ",
      title: "İleri Düzey Araştırma",
      description:
        "Laboratuvarlarımızda geliştirdiğimiz son teknoloji ürünler, endüstride yeni standartlar belirliyor.",
    },
    {
      highlight: "SÜRDÜRÜLEBİLİRLİK",
      title: "Çevre Dostu Üretim",
      description:
        "Doğaya saygılı üretim süreçlerimizle, gelecek nesillere yaşanabilir bir dünya bırakıyoruz.",
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
        <Canvas camera={{ position: [-10, 4, 8], fov: 60 }}>
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
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3Y5aHZ0Ym0zZGFkOHRqYzVoZ3czOHZ0YjZsaGQwYzN0aGd0NzRwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlTy9x8FZo0XO1i/giphy.gif"
            alt="Döndürülebilir"
            className="w-20 h-20 opacity-70"
          />
        </div>
      </div>

      {/* Sidebar - Sağ taraf (1/4) */}
      <div className="w-1/4 h-full rounded-l-[3rem] shadow-2xl overflow-y-auto bg-gri font-quicksand">
        <div className="min-h-full flex flex-col justify-center p-8 py-16 space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              {/* Title */}
              <h2 className="text-white text-2xl font-bold mb-4 leading-tight">
                {section.title}
              </h2>

              {/* Description */}
              <p className="text-white text leading-relaxed">
                {section.description}
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
