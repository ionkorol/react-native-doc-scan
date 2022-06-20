import React from "react";
import { MainProvider } from "./contexts/MainContext";
import { DocScanComponent } from "./DocScanComponent";

export const KorolDocScan: React.FC = ({ children }) => {
  return (
    <MainProvider>
      <DocScanComponent />
      {children}
    </MainProvider>
  );
};

export { useKorolDocScan } from "./hooks/useKorolDocScan";
