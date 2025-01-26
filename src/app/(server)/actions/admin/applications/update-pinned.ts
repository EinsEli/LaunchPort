"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePage } from "../../revalidate";

export async function updateApplications(data: {
	apps: { id: string; isPinned?: boolean }[];
}) {
	const session = await auth();
	if (!session?.user?.id) return;

	await Promise.all(
		data.apps.map((app) =>
			prisma.application.update({
				where: {
					id: app.id,
					userId: session.user?.id,
				},
				data: {
					isPinned: !!app.isPinned,
				},
			}),
		),
	);

	await revalidatePage();
}
