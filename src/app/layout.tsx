import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Provider as JotaiProvider } from "jotai";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
	title: "LaunchPort",
	description: "Start your stopped Docker applications with ease.",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${GeistSans.className} h-screen antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<TooltipProvider>
						<SessionProvider session={session}>
							<JotaiProvider>{children}</JotaiProvider>
						</SessionProvider>
						<Toaster />
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
