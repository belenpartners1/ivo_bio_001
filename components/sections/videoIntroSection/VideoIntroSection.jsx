"use client";

import { useLocale } from "next-intl";

const VideoIntroSection = () => {
  const locale = useLocale();

  // Dil seçimine göre YouTube video URL'i
  const videoUrl =
    locale === "tr"
      ? "https://www.youtube.com/embed/tmL8ju7AKmU?si=1YQakDwv7bO5_SBO"
      : locale === "ar"
      ? "https://www.youtube.com/embed/AG5jRnE1jQ8?si=oTOHwntBkPerdCXj"
      : "https://www.youtube.com/embed/1gNb2H6JAtk?si=JIywF2cUo4nbXsER";

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-gri py-12"
      id="tanitim-filmi"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <iframe
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full aspect-video rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};

export default VideoIntroSection;
