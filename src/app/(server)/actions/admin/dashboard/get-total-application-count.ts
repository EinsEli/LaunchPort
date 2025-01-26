"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export default async function getTotalApplicationCount(): Promise<number> {
	const session = await auth();

	if (!session || !session.user) {
		return 0;
	}

	return await prisma.application.count({
		where: {
			userId: session.user.id,
		},
	});
}
