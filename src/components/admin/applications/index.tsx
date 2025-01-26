/*
 * APPLICATIONS
 * -----------------
 * Entrypoint for the application list table.
 */
import getAllApplications from "@/app/(server)/actions/admin/applications/get-all-applications";
import ApplicationTable from "./application-table";

export default async function Applications() {
	const applications = await getAllApplications();

	return <ApplicationTable applications={applications} />;
}
