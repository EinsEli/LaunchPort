/*
 * NAVIGATION DRAWER
 * -----------------
 * This component represents the navigation drawer that is displayed
 * when the user clicks on the navigation button in the header.
 */
import {
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { navigationEntries } from "../entry-list";
import NavigationDrawerEntry from "./entry";
import { Separator } from "@/components/ui/separator";
import { PiPlus } from "react-icons/pi";
import SignOutButton from "@/components/control/application-card/sign-out-button";

export default function NavigationDrawer() {
	return (
		<DrawerContent className="w-full gap-4">
			<DrawerHeader>
				<DrawerTitle>Navigation</DrawerTitle>
			</DrawerHeader>
			<div className="flex w-full flex-col gap-2 px-4 pb-6">
				{navigationEntries.map((entry, index) => (
					<NavigationDrawerEntry
						href={entry.href}
						icon={entry.icon}
						label={entry.label}
						key={index}
					/>
				))}
				<Separator className="my-4" />
				<NavigationDrawerEntry
					href="/add-client"
					icon={<PiPlus />}
					label="Add client"
				/>
				<Separator className="my-4" />
				<SignOutButton variant="secondary">Sign out</SignOutButton>
			</div>
		</DrawerContent>
	);
}
