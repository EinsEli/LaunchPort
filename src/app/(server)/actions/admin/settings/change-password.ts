"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import hashString from "@/lib/hash";
import { FormResponse } from "@/types/response";

export async function changePassword({
	oldPassword,
	newPassword,
}: {
	oldPassword: string;
	newPassword: string;
}): Promise<FormResponse> {
	const session = await auth();
	/*
		PRE-CHECKS
	*/
	if (!session) {
		return { code: "NO_SESSION", message: "No session found" };
	}
	const dbUser = await prisma.user.findUnique({
		where: {
			id: session.user?.id,
		},
	});
	if (!dbUser) {
		return { code: "NOT_FOUND", message: "User not found" };
	}

	const allowChange =
		oldPassword && dbUser.password === hashString(oldPassword);

	if (!allowChange) {
		return {
			code: "AUTHENTICATION_FAILED",
			message: "Incorrect old password",
		};
	}
	try {
		await prisma.user.update({
			where: { id: session.user?.id },
			data: { password: hashString(newPassword) },
		});
	} catch (error) {
		console.error(error);
		return {
			code: "SERVER_ERROR",
			message: "Internal server error while updating password.",
		};
	}
	return { code: "SUCCESS", message: "Password changed" };
}
