"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { FormResponse } from "@/types/response";

export async function changeEmail(email: string): Promise<FormResponse> {
	const session = await auth();
	/*
	  PLAUSIBILITY CHECKS
	*/
	if (!session) {
		return { code: "NO_SESSION", message: "No session found" };
	}

	const emailInUse = await prisma.user.findUnique({
		where: { email: email },
	});
	if (emailInUse) {
		return {
			code: "ALREADY_EXISTS",
			message: "An account with this email already exists.",
		};
	}

	const dbUser = await prisma.user.findUnique({
		where: { id: session.user?.id },
	});

	if (!dbUser) {
		return { code: "SERVER_ERROR", message: "User not found" };
	}

	try {
		await prisma.user.update({
			where: { id: session.user?.id },
			data: { email },
		});
	} catch (error) {
		console.error(error);
		return {
			code: "SERVER_ERROR",
			message: "Internal server error while updating email.",
		};
	}
	return { code: "SUCCESS", message: "Email changed" };
}
