import Image from "next/image";
import React from "react";

const Try = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden ">
      <div className="mix-blend-lighten z-20">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/bivivivi.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold p-20  mix-blend-difference w-full mx-auto ">
        <h1 className="font-extrabold text-[140px] leading-44 text-center text-kahverengi tracking-tighter">
          IVO Bio, size yeni bir hayat getiriyor !
        </h1>
      </div>
    </div>
  );
};

export default Try;
