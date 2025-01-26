/*
 * PUBLIC APPLICATION CARD
 * -----------------
 * The card for public applications, with the control button, icon, link, description and control button.
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TbArrowUpRight } from "react-icons/tb";
import ApplicationControlButton from "../../application-control-button";
import Link from "next/link";
import Image from "next/image";
import { Application } from "@prisma/client";

export default function AllowedApplicationCard({
	application,
}: {
	application: Application;
}) {
	return (
		<Card className="min-w-96 overflow-hidden py-4">
			<CardHeader className="flex items-center justify-center gap-6">
				<Image
					src={application.icon}
					alt={application.friendlyName + " icon"}
					width={96}
					height={96}
					className="drag-none select-none"
				/>
				<CardTitle className="flex flex-col items-center justify-center gap-2">
					<Link
						href={`https://${application.urls[0]}`}
						className="group relative flex items-center justify-center"
					>
						<h1 className="line-clamp-2 w-fit max-w-60 text-center hover:underline">
							{application.friendlyName}
						</h1>
						<TbArrowUpRight
							size={24}
							className="absolute right-0 translate-x-0 transform opacity-0 blur-sm transition-all duration-300 group-hover:translate-x-7 group-hover:opacity-100 group-hover:blur-0"
						/>
					</Link>
					<p className="line-clamp-2 w-80 text-center text-base font-medium text-muted-foreground">
						{application.description}
					</p>
				</CardTitle>
				<Separator className="my-2" />
			</CardHeader>
			<CardContent className="flex flex-row gap-2">
				<ApplicationControlButton
					application={application}
					autoRefresh
				/>
			</CardContent>
		</Card>
	);
}
