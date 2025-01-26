"use server";

import { prisma } from "@/lib/db";
import hashString from "@/lib/hash";
import { FormResponse } from "@/types/response";

export async function registerUser({
	email,
	password,
	name,
}: {
	email: string;
	password: string;
	name: string;
}): Promise<FormResponse> {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user) {
		return {
			code: "ALREADY_EXISTS",
			message: "User with the same email already exists",
		};
	}

	try {
		await prisma.user.create({
			data: {
				email,
				name,
				password: hashString(password),
			},
		});
		return {
			code: "SUCCESS",
			message: "User created successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			code: "SERVER_ERROR",
			message: "Failed to create user",
		};
	}
}
