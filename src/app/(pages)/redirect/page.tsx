/*
 * This page is responsible for redirecting the user to the correct
 * application page based on the origin url.
 */
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		[key: string]: string | string[] | undefined;
	}>;
}) {
	const { origin } = await searchParams;
	const originString = Array.isArray(origin) ? origin[0] : origin || "";
	const strippedOrigin = new URL(originString).hostname;

	// Find application with the given urls
	const application = await prisma.application.findFirst({
		where: {
			urls: {
				has: strippedOrigin,
			},
		},
	});

	if (!application) {
		return redirect(`/applications/not-found?origin=${strippedOrigin}`);
	} else {
		return redirect(`/applications/${application.slug}`);
	}
}
