import React from "react";

const IvoLogo = ({
  width = 200,

  height = 65,

  color = "#a4b49f", // Varsayılan marka rengin

  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="iVO bio logo"
    >
      {/* Çerçeve */}
      <path
        d="M 40,10 H 360 Q 385,10 380,35 L 355,105 Q 350,120 325,120 H 40 Q 10,120 10,90 V 40 Q 10,10 40,10 Z"
        stroke={color}
        strokeWidth="5"
        fill="none"
      />

      {/* iVO Yazısı - Serif Font */}
      <text
        x="75"
        y="95"
        fill={color}
        style={{
          fontFamily: "'Bodoni MT', 'Didot', 'Times New Roman', serif",

          fontWeight: "bold",

          fontSize: "110px",
        }}
      >
        iVO
      </text>

      {/* bio Yazısı - Sans-Serif Font */}
      <text
        x="285"
        y="95"
        fill={color}
        style={{
          fontFamily: "'Arial', sans-serif",

          fontWeight: "normal",

          fontSize: "28px",

          letterSpacing: "1px",
        }}
      >
        bio
      </text>
    </svg>
  );
};

export default IvoLogo;
