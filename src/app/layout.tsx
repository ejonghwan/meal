
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { fontDefault } from '@/src/lib/ui/fonts'
import "@/src/styles/globals.css";
import DeviceTypeLayout from "@/src/components/common/device-type-layout";


// import clsx from "clsx";

export const metadata: Metadata = {
	title: '',
	description: 'b',
	icons: {
		icon: "/favicon.ico",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}




export default function RootLayout({ children, }: { children: React.ReactNode; }) {

	return (
		<html lang="ko" suppressHydrationWarning className={`${fontDefault.variable}`}>
			<head />
			{/* min-h-screen bg-background font-sans antialiased */}
			<body className={`min-h-screen antialiased overflow-hidden`}
			>
				<DeviceTypeLayout>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						{children}
					</Providers>
				</DeviceTypeLayout>
			</body>
		</html>
	);
}
