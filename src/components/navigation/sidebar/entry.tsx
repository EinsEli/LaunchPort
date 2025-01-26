/*
 * SIDEBAR ENTRY
 * -------------
 * This component represents a single, clickable link-entry in the sidebar.
 */
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarEntry({
	label,
	icon,
	iconSelected,
	href = "#",
	isCollapsed,
	...props
}: {
	label: string;
	icon: React.ReactNode;
	iconSelected: React.ReactNode;
	href?: string;
	isCollapsed: boolean;
} & React.ComponentProps<"a">) {
	const currentPath = usePathname();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={href || "#"}
					className={`w-fullflex-row group flex items-center gap-3 overflow-hidden rounded-lg px-4 py-2 transition-all duration-200 hover:bg-primary/5 ${currentPath === href && "bg-primary/5 hover:bg-primary/10"} `}
					{...props}
				>
					<div
						className={`flex flex-col items-center text-xl transition-colors duration-300 ${
							currentPath === href
								? "text-primary"
								: "text-muted-foreground group-hover:text-primary"
						}`}
					>
						{currentPath === href ? iconSelected : icon}
					</div>
					<span
						className={`line-clamp-1 text-sm font-medium transition-all duration-300 group-hover:text-primary ${isCollapsed ? "opacity-0" : "opacity-100"} ${
							currentPath === href
								? "text-primary"
								: "text-muted-foreground group-hover:text-primary"
						}`}
					>
						{label}
					</span>
				</Link>
			</TooltipTrigger>
			{isCollapsed && (
				<TooltipContent side="right">
					<span className="text-sm font-semibold">{label}</span>
				</TooltipContent>
			)}
		</Tooltip>
	);
}
