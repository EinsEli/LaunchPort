"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { FormResponse } from "@/types/response";

export type Passkey = {
	credentialID: string;
	createdAt: Date;
	userId: string;
};

export default async function deletePasskey(
	credentialID: string,
): Promise<FormResponse> {
	const session = await auth();

	if (!session || !session.user) {
		return {
			code: "NO_SESSION",
			message: "No session found.",
		};
	}

	try {
		await prisma.authenticator.delete({
			where: {
				credentialID,
			},
		});

		return {
			code: "SUCCESS",
			message: "Passkey deleted successfully.",
		};
	} catch (error) {
		console.error(error);

		return {
			code: "SERVER_ERROR",
			message: "An error occurred while deleting the passkey.",
		};
	}
}
