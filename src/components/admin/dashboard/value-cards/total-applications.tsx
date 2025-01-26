import getTotalApplicationCount from "@/app/(server)/actions/admin/dashboard/get-total-application-count";
import ApplicationsIcon from "@/components/icons/applications";
import BigValueCard from "@/components/ui/big-value-card";

export default async function TotalApplicationsCard() {
	const count = await getTotalApplicationCount();

	return (
		<BigValueCard
			label="Total Applications"
			value={count.toString()}
			icon={<ApplicationsIcon />}
			className="w-full"
		/>
	);
}
