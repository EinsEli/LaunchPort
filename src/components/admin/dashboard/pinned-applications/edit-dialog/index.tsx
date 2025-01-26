import getAllApplications from "@/app/(server)/actions/admin/applications/get-all-applications";
import EditPinnedApplicationsDialog from "./dialog";
import EditPinnedAppsDialogTrigger from "./trigger";

export default async function EditPinnedWrapper() {
	const applications = await getAllApplications();

	return (
		<>
			<EditPinnedAppsDialogTrigger />
			<EditPinnedApplicationsDialog applications={applications} />
		</>
	);
}
