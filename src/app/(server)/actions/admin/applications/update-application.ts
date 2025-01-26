"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { FormResponse } from "@/types/response";
import { Application } from "@prisma/client";

export default async function updateApplication(
	application: Application,
): Promise<FormResponse> {
	const session = await auth();

	if (!session || !session.user?.id) {
		return {
			code: "NO_SESSION",
			message: "No session found",
		};
	}

	try {
		await prisma.application.update({
			data: {
				...application,
			},
			where: {
				id: application.id,
				userId: session.user.id,
			},
		});
		return {
			code: "SUCCESS",
			message: "Application updated successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			code: "SERVER_ERROR",
			message: "Failed to update application",
		};
	}
}
