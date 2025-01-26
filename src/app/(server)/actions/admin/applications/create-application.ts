"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { FormResponse } from "@/types/response";

export default async function createApplication(application: {
	slug: string;
	friendlyName: string;
	description: string;
	icon: string;
	urls: string[];
	containerNames: string[];
}): Promise<FormResponse> {
	const session = await auth();

	if (!session || !session.user?.id) {
		return {
			code: "NO_SESSION",
			message: "No session found",
		};
	}

	// Search for existing application with the same slug or urls
	const existingApplication = await prisma.application.findFirst({
		where: {
			OR: [
				{ slug: application.slug },
				{ urls: { hasSome: application.urls } },
			],
		},
	});
	if (existingApplication) {
		return {
			code: "ALREADY_EXISTS",
			message: "Application with the same slug or urls already exists",
		};
	}

	try {
		await prisma.application.create({
			data: {
				...application,
				userId: session.user.id,
			},
		});
		return {
			code: "SUCCESS",
			message: "Application created successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			code: "SERVER_ERROR",
			message: "Failed to create application",
		};
	}
}
