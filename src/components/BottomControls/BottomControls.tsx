import React from "react";
import { CropActions, FilterList } from "./components";

export const BottomControls: React.FC = () => {
  return (
    <>
      <CropActions />
      <FilterList />
    </>
  );
};
