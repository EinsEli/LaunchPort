/*
 * PINNED APPLICATION CARD
 * -----------------
 * This component represents a single application card on the home dashboard.
 */
"use client";

import { Application } from "@prisma/client";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import ApplicationControlButton from "@/components/control/application-control-button";

export default function PinnedApplicationCard({
	application,
}: {
	application: Application;
}) {
	return (
		<Card className="overflow-hidden shadow-sm transition-shadow duration-500 hover:shadow-xl">
			<CardContent className="flex h-fit flex-col gap-2 p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
				<div className="flex flex-row items-center gap-2">
					<Image
						src={application.icon}
						alt={application.friendlyName + " icon"}
						width={24}
						height={24}
						className="drag-none flex-shrink-0 select-none"
					/>
					<CardTitle className="text-md line-clamp-1 font-semibold text-primary">
						{application.friendlyName}
					</CardTitle>
				</div>
				<CardDescription className="line-clamp-2 h-10">
					{application.description}
				</CardDescription>
				<Separator className="my-2" />
				<ApplicationControlButton application={application} />
			</CardContent>
		</Card>
	);
}
