import TopographicPattern from "@/components/ui/topographic-pattern";
import ThemeToggle from "@/components/ui/theme-toggle";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LuGlobe, LuText } from "react-icons/lu";
import { auth } from "@/auth";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ slug: string; origin: string }>;
}) {
	const { slug, origin } = await searchParams;
	const session = await auth();

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
			<Card className="min-w-96 overflow-hidden py-4">
				<CardHeader className="flex items-center justify-center gap-6">
					<Image
						src="/img/not-found.svg"
						alt="Application not found icon"
						width={296}
						height={296}
						className="drag-none select-none"
					/>
					<CardTitle className="flex flex-col items-center justify-center gap-2">
						<h1>Application not found 💭</h1>
						<div className="flex w-full flex-col items-center gap-8">
							<p className="w-80 text-balance text-center text-base font-medium text-muted-foreground">
								No application matching the details below could
								be found.
							</p>
							<div className="flex w-full flex-col gap-2">
								{slug && (
									<div className="flex w-full flex-row items-center gap-3 rounded-lg border bg-card px-2 py-2">
										<div className="flex size-10 flex-shrink-0 flex-col items-center justify-center rounded-md border border-input bg-border/55 text-xl">
											<LuText />
										</div>
										<div className="flex flex-col">
											<p className="h-4 text-sm font-semibold">
												Name
											</p>
											<div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-400">
												{slug}
											</div>
										</div>
									</div>
								)}
								{origin && (
									<div className="flex w-full flex-row items-center gap-3 rounded-lg border bg-card px-2 py-2">
										<div className="flex size-10 flex-shrink-0 flex-col items-center justify-center rounded-md border border-input bg-border/55 text-xl">
											<LuGlobe />
										</div>
										<div className="flex flex-col">
											<p className="h-4 text-sm font-semibold">
												Origin
											</p>
											<div className="flex flex-row items-center gap-2 text-sm font-medium text-gray-400">
												{origin}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex flex-col items-center justify-center gap-2">
					{session && (origin || slug) ? (
						<>
							<Separator className="my-2" />
							<p className="my-2 w-80 text-center text-sm font-medium text-muted-foreground">
								You can quickly create an application using
								these details.
							</p>
							<Link
								className="w-full"
								href={`/admin/applications?${slug ? `slug=${slug}` : ""}${slug && origin ? "&" : ""}${origin ? `origin=${origin}` : ""}`}
							>
								<Button className="w-full">
									Create application
								</Button>
							</Link>
						</>
					) : (
						<Link href="/" className="w-full">
							<Button className="w-full">Go to home page</Button>
						</Link>
					)}
				</CardFooter>
			</Card>
		</div>
	);
}
