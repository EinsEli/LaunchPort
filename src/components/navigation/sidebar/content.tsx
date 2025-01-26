/*
 * SIDEBAR CONTENT
 * ---------------
 * This component is used to define the structure and components of the sidebar.
 */
"use client";

import { Separator } from "../../ui/separator";
import CollapseButton from "./collapse-button";
import SidebarEntry from "./entry";
import { PiPlus } from "react-icons/pi";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useEffect, useState } from "react";
import { setInitialSidebarState } from "@/app/(server)/actions/cookies/sidebar-state";
import { navigationEntries } from "../entry-list";
import SidebarLogo from "./logo";
import AccountSwitcher from "./account";
import {
	applicationsAddDialogOpenAtom,
	applicationsSelectedApplication,
} from "@/atoms/applications";
import { useSetAtom } from "jotai";

export default function SidebarContent({
	initialState,
}: {
	initialState: boolean;
}) {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(initialState);
	const setSelectedApplication = useSetAtom(applicationsSelectedApplication);
	const setAddApplicationDialogOpen = useSetAtom(
		applicationsAddDialogOpenAtom,
	);

	useEffect(() => {
		setInitialSidebarState(isCollapsed);
	}, [isCollapsed]);

	return (
		<div
			className={`hidden h-full flex-col justify-between gap-8 transition-all duration-300 sm:flex ${isCollapsed ? "w-14" : "w-72"} `}
		>
			{/* Logo Header */}
			<SidebarLogo isCollapsed={isCollapsed} />
			{/* Navigation */}
			<div className="h-full">
				<div className="flex flex-col gap-2">
					{navigationEntries.map((entry) => (
						<SidebarEntry
							key={entry.href}
							href={entry.href}
							icon={entry.icon}
							iconSelected={entry.iconSelected}
							label={entry.label}
							isCollapsed={isCollapsed}
						/>
					))}
				</div>
				<div className="px-2">
					<Separator className="my-4" />
				</div>
				<SidebarEntry
					icon={<PiPlus />}
					iconSelected={<PiPlus />}
					label="Add Application"
					isCollapsed={isCollapsed}
					onClick={() => {
						setSelectedApplication(undefined);
						setAddApplicationDialogOpen(true);
					}}
				/>
			</div>
			{/* Account Switcher */}
			<div className="flex flex-col items-start justify-start gap-4">
				<ThemeToggle />
				<CollapseButton
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
				/>
				<AccountSwitcher isCollapsed={isCollapsed} />
			</div>
		</div>
	);
}
