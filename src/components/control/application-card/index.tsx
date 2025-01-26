/*
 * APPLICATION CARD
 * -----------------
 * This component is the main "entry point" for the application card component.
 * It checks if the application is public or private and renders the appropriate card.
 */
import { Application } from "@prisma/client";
import { auth } from "@/auth";
import PrivateApplicationCard from "./variants/private";
import AllowedApplicationCard from "./variants/allowed";
import OtherUserApplicationCard from "./variants/other-user";

export default async function ApplicationCard({
	application,
}: {
	application: Application;
}) {
	const session = await auth();

	// Application is public or user can access it
	if (application.isPublic || session?.user?.id === application.userId) {
		return <AllowedApplicationCard application={application} />;
	}

	// Application is private and user is not logged in
	if (!session?.user) {
		return <PrivateApplicationCard />;
	}

	// Application is private but user is not the owner
	if (session?.user?.id !== application.userId) {
		return <OtherUserApplicationCard />;
	}
}
