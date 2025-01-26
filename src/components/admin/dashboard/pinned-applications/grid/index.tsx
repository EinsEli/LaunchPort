import getPinnedApplications from "@/app/(server)/actions/admin/applications/get-pinned-applications";
import ApplicationGrid from "./grid";

export default async function PinnedApplicationsGridWrapper() {
	const applications = await getPinnedApplications();

	return (
		<>
			{applications.length === 0 && (
				<p className="flex flex-col gap-1 pt-10 text-center text-muted-foreground">
					No applications pinned.
				</p>
			)}
			<ApplicationGrid applications={applications} />
		</>
	);
}
