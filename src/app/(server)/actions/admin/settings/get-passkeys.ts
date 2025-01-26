"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export type Passkey = {
	credentialID: string;
	createdAt: Date;
	userId: string;
};

export default async function getPasskeys(): Promise<Passkey[]> {
	const session = await auth();

	if (!session || !session.user) {
		return [];
	}

	try {
		return await prisma.authenticator.findMany({
			select: {
				credentialID: true,
				createdAt: true,
				userId: true,
			},
			where: {
				userId: session.user.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.error(error);

		return [];
	}
}
