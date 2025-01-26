"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import hashString from "@/lib/hash";
import { FormResponse } from "@/types/response";

export async function deleteAccount(password: string): Promise<FormResponse> {
	const session = await auth();

	if (!session) {
		return { code: "NO_SESSION", message: "No session found" };
	}

	const dbUser = await prisma.user.findUnique({
		where: { id: session.user?.id },
	});

	if (!dbUser) {
		return { code: "NOT_FOUND", message: "User not found" };
	}

	if (!dbUser.password) {
		return { code: "AUTHENTICATION_FAILED", message: "No password set" };
	}

	const validPassword = hashString(password) === dbUser.password;

	if (!validPassword) {
		return { code: "AUTHENTICATION_FAILED", message: "Incorrect password" };
	}

	// Delete the user
	try {
		await prisma.user.delete({ where: { id: session.user?.id } });
	} catch (error) {
		console.error(error);
		return {
			code: "SERVER_ERROR",
			message: "Internal server error while deleting account.",
		};
	}
	return { code: "SUCCESS", message: "Account deleted" };
}
