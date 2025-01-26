import TopographicPattern from "@/components/ui/topographic-pattern";
import ApplicationCard from "@/components/control/application-card";
import ThemeToggle from "@/components/ui/theme-toggle";
import Logo from "@/components/ui/logo";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const application = await prisma.application.findUnique({
		where: { slug },
	});

	if (!application) {
		return redirect(`/applications/not-found?slug=${slug}`);
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			<TopographicPattern />
			<div className="absolute right-0 top-0 animate-entry-blur p-4">
				<ThemeToggle />
			</div>
			<Link
				href="/"
				className="absolute left-0 top-0 animate-entry-blur p-8 opacity-0"
			>
				<Logo size={32} variant="combined" />
			</Link>
			<ApplicationCard application={application} />
		</div>
	);
}
