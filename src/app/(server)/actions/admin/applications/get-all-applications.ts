"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Application } from "@prisma/client";

export default async function getAllApplications(): Promise<Application[]> {
	const session = await auth();

	if (!session || !session.user) {
		return [];
	}

	return (
		await prisma.application.findMany({
			where: {
				userId: session.user.id,
			},
		})
	).sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));
}
