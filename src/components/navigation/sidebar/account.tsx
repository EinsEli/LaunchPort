/*
 * ACCOUNT SWITCHER
 * ----------------
 * This component is responsible for displaying the account switcher in the sidebar.
 * The user can navigate to the account settings or sign out from LaunchPort.
 */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";

export default function AccountSwitcher({
	isCollapsed,
}: {
	isCollapsed: boolean;
}) {
	const { data: session } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Card className="flex w-full cursor-pointer flex-row items-center gap-4 overflow-hidden rounded-lg px-[9px] py-2">
					<Avatar className="size-9 rounded-sm">
						<AvatarImage
							className="rounded-sm"
							src={session?.user?.image || ""}
						/>
						<AvatarFallback className="rounded-sm">
							{session?.user?.name?.[0] || "LP"}
						</AvatarFallback>
					</Avatar>
					<div
						className={`flex flex-row items-center gap-2 transition-all duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"} `}
					>
						<div
							className={`flex w-full max-w-36 flex-col transition-all duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"} `}
						>
							<p className="text-md h-5 w-full truncate font-medium">
								{session?.user?.name || "Error loading name"}
							</p>
							<p className="w-full truncate text-sm font-medium text-gray-500">
								{session?.user?.email || "Error loading email"}
							</p>
						</div>
					</div>
				</Card>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-44">
				<DropdownMenuItem onClick={() => signOut()}>
					<PiSignOut /> Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
