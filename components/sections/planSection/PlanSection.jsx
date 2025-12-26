import React from "react";
import FloorPlan from "./FloorPlan";
import FloorInfo from "./FloorInfo";
import FloorPlan2 from "./FloorPlan2";
import FloorPlan3 from "./FloorPlan3";

const PlanSection = () => {
  return (
    <div>
      <FloorPlan />
      <FloorPlan2 />
      <FloorPlan3 />
      <FloorInfo />
    </div>
  );
};

export default PlanSection;
