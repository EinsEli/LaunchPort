"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { RiContrast2Line } from "react-icons/ri";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useIsMobile from "@/hooks/useIsMobile";
import {
	Drawer,
	DrawerButton,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";

export default function ThemeToggle() {
	const isMobile = useIsMobile();
	const { theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		setCurrentTheme(theme);
	}, [theme]);

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<Button
						variant="ghost"
						className="w-14 text-muted-foreground"
					>
						<ThemeIcon currentTheme={currentTheme} />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="w-full gap-4">
					<DrawerHeader>
						<DrawerTitle>Select a Theme</DrawerTitle>
					</DrawerHeader>
					<div className="flex w-full flex-col gap-2 px-4 pb-6">
						<DrawerButton
							active={currentTheme === "light"}
							icon={<Sun />}
							label="Light"
							onClick={() => {
								setTheme("light");
							}}
						/>
						<DrawerButton
							active={currentTheme === "dark"}
							icon={<Moon />}
							label="Dark"
							onClick={() => {
								setTheme("dark");
							}}
						/>
						<DrawerButton
							active={currentTheme === "system"}
							icon={<RiContrast2Line />}
							label="System"
							onClick={() => {
								setTheme("system");
							}}
						/>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="w-14 text-muted-foreground">
					<ThemeIcon currentTheme={currentTheme} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => {
						setTheme("light");
					}}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setTheme("dark");
					}}
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setTheme("system");
					}}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ThemeIcon({ currentTheme }: { currentTheme: string | undefined }) {
	return (
		<>
			<Sun
				className={`h-[1.2rem] w-[1.2rem] ${currentTheme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"} transition-transform`}
			/>
			<Moon
				className={`absolute h-[1.2rem] w-[1.2rem] ${currentTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"} transition-transform`}
			/>
			<RiContrast2Line
				className={`absolute h-[1.2rem] w-[1.2rem] ${currentTheme === "system" ? "rotate-0 scale-100" : "rotate-90 scale-0"} transition-transform`}
			/>
			<span className="sr-only">Toggle theme</span>
		</>
	);
}
