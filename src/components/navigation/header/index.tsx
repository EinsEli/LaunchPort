/*
 * HEADER ENTRY COMPONENT
 * -------------------------
 * This is the entrypoint for the header component.
 * It contains the header component for the mobile view.
 */
"use client";

import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import NavigationDrawer from "./navigation-drawer";
import { GiHamburgerMenu } from "react-icons/gi";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function Header() {
	return (
		<div className="fixed top-0 z-50 flex h-16 w-full flex-row items-center justify-between border-t border-border/30 px-2 text-muted-foreground sm:hidden">
			<ProgressiveBlur className="fixed left-0 right-0 top-0 -z-10 h-16 w-full" />
			<div className="flex size-full flex-col items-start justify-center">
				<Drawer>
					<DrawerTrigger asChild>
						<Button
							variant="ghost"
							className="w-14 hover:bg-transparent"
						>
							<GiHamburgerMenu />
						</Button>
					</DrawerTrigger>
					<NavigationDrawer />
				</Drawer>
			</div>
			<div className="flex size-full flex-col items-center justify-center">
				<Logo variant="icon-border" size={32} />
			</div>
			<div className="flex size-full flex-col items-end justify-center">
				<ThemeToggle />
			</div>
		</div>
	);
}
