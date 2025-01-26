/*
 * SIDEBAR LOGO
 * ------------
 * This component is used to display the logo in the sidebar.
 * It can collapse and expand the logo based on the sidebar state.
 */
import Logo from "@/components/ui/logo";
import Link from "next/link";

export default function SidebarLogo({ isCollapsed }: { isCollapsed: boolean }) {
	return (
		<Link href="/">
			<div className="flex h-20 w-full flex-row items-center gap-2.5 overflow-hidden pl-3">
				<Logo size={32} variant="icon" animated />
				<span
					className={`line-clamp-1 flex-shrink-0 text-xl font-semibold transition-opacity duration-300 ${
						isCollapsed ? "opacity-0" : "opacity-100"
					}`}
				>
					<Logo size={32} variant="wordmark" />
				</span>
			</div>
		</Link>
	);
}
