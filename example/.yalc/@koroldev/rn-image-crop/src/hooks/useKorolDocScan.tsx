import React, { useContext } from "react";
import { IMainContext, MainContext } from "../contexts/MainContext";

export const useKorolDocScan = (): IMainContext => {
  const context = useContext(MainContext);
  return context;
};
