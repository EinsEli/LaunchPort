import { auth } from "@/auth";
import ApplicationDialog from "@/components/admin/applications/application-dialog";
import Header from "@/components/navigation/header";
import Sidebar from "@/components/navigation/sidebar";
import ProgressiveBlurWrapper from "@/components/ui/progressive-blur-wrapper";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		return redirect("/auth");
	}

	return (
		<>
			<main
				vaul-drawer-wrapper=""
				className="flex h-screen w-full flex-col sm:flex-row sm:gap-6 sm:p-5"
			>
				<Sidebar />
				<section className="relative h-full w-full flex-col gap-2 overflow-y-auto border-border bg-card sm:rounded-xl sm:border sm:bg-neutral-50 sm:dark:bg-neutral-900">
					<ProgressiveBlurWrapper>
						<div className="-mt-10 flex h-fit w-full flex-shrink-0 flex-col gap-4 p-6 pt-28 sm:mt-0 sm:pt-6">
							{children}
						</div>
					</ProgressiveBlurWrapper>
				</section>
				<Header />
			</main>
			<ApplicationDialog />
		</>
	);
}
