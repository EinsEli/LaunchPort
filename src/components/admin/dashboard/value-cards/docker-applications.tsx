import getDockerContainerCount from "@/app/(server)/actions/admin/dashboard/get-docker-container-count";
import DockerIcon from "@/components/icons/docker";
import BigValueCard from "@/components/ui/big-value-card";

export default async function DockerApplicationsCard() {
	const count = await getDockerContainerCount();

	return (
		<BigValueCard
			label="Docker Applications"
			value={count.toString()}
			icon={<DockerIcon />}
			className="w-full"
		/>
	);
}
