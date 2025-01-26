/*
 * NAVIGATION DRAWER ENTRY
 * -------------------------
 * This component represents a single, clickable link-entry in the navigation drawer.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawerButton } from "@/components/ui/drawer";

export default function NavigationDrawerEntry({
	label,
	icon,
	href,
}: {
	label: string;
	icon: React.ReactNode;
	href: string;
}) {
	const currentPath = usePathname();

	return (
		<Link href={href}>
			<DrawerButton
				active={currentPath === href}
				icon={icon}
				label={label}
			/>
		</Link>
	);
}
