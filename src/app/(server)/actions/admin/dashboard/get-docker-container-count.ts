"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getDockerContainerCount(): Promise<number> {
	const session = await auth();

	if (!session || !session.user) {
		return 0;
	}

	const applications = await prisma.application.findMany({
		where: {
			userId: session.user.id,
		},
		select: {
			containerNames: true,
		},
	});

	const allContainerNames = applications.flatMap((app) => app.containerNames);
	const uniqueContainerNames = new Set(allContainerNames);

	return uniqueContainerNames.size;
}
