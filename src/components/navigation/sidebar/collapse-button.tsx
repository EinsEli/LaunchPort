/*
 * COLLAPSE BUTTON
 * ---------------
 * This component represents the button that collapses and expands the sidebar.
 */
"use client";

import { Button } from "@/components/ui/button";
import { TbChevronLeft } from "react-icons/tb";

export default function CollapseButton({
	isCollapsed,
	setIsCollapsed,
}: {
	isCollapsed: boolean;
	setIsCollapsed: (isCollapsed: boolean) => void;
}) {
	return (
		<Button
			variant="ghost"
			className="w-14 text-muted-foreground"
			onClick={() => {
				setIsCollapsed(!isCollapsed);
			}}
		>
			<TbChevronLeft
				className={`transition-transform duration-300 ${isCollapsed && "rotate-180"}`}
			/>
		</Button>
	);
}
