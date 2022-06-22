import React from "react";
import { MainProvider } from "./contexts/MainContext";
import { DocScanComponent } from "./DocScanComponent";

interface IProps {
	children: React.ReactNode;
}

export const KorolDocScan = ({ children }: IProps) => {
	return (
		<MainProvider>
			<DocScanComponent />
			{children}
		</MainProvider>
	);
};
export { useKorolDocScan } from "./hooks/useKorolDocScan";
