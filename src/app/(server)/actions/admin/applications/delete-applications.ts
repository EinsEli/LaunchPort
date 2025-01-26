"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Application } from "@prisma/client";

export default async function deleteApplications(applications: Application[]) {
	const session = await auth();

	if (!session || !session.user) {
		return [];
	}

	applications.forEach(async (application) => {
		try {
			await prisma.application.delete({
				where: {
					id: application.id,
					userId: session.user?.id,
				},
			});
		} catch (error) {
			console.error(error);
		}
	});
}
