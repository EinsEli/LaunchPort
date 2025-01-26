"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Application } from "@prisma/client";

export default async function getPinnedApplications(): Promise<Application[]> {
	const session = await auth();

	if (!session || !session.user) {
		return [];
	}

	return (
		await prisma.application.findMany({
			where: {
				userId: session.user.id,
				isPinned: true,
			},
		})
	).sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
}
