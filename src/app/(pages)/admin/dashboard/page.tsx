import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserGreeting from "@/components/admin/dashboard/user-greeting";
import PinnedApplications from "@/components/admin/dashboard/pinned-applications";
import { Separator } from "@/components/ui/separator";
import TotalApplicationsCard from "@/components/admin/dashboard/value-cards/total-applications";
import DockerApplicationsCard from "@/components/admin/dashboard/value-cards/docker-applications";

export default function Page() {
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/dashboard">
							Dashboard
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div>
				<UserGreeting />
				<p className="text-sm font-medium text-muted-foreground">
					Get an overview of your pinned applications.
				</p>
			</div>
			<Separator />
			<div className="mt-2 flex w-full flex-col gap-4 lg:flex-row">
				<TotalApplicationsCard />
				<DockerApplicationsCard />
			</div>
			<Separator className="my-2" />
			<PinnedApplications />
		</>
	);
}
