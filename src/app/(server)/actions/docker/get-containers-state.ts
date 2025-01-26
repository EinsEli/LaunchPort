"use server";

import { getContainerByName } from "@/lib/docker";
import { ContainerStatusResponse } from "@/types/response";

export default async function getContainersState(
	containers: string[],
): Promise<ContainerStatusResponse> {
	// Get the containers state, and return the application status (as a whole)
	for (const container of containers) {
		let containerState;
		try {
			containerState = await getContainerByName(container).then(
				(containerInfo) => containerInfo?.State,
			);
		} catch (error) {
			console.error(
				`Failed to get container state for ${container}`,
				error,
			);
			return {
				code: "SERVER_ERROR",
				message: "Failed to get container state",
				status: "error",
			};
		}
		if (containerState === "running") {
			return {
				code: "SUCCESS",
				message: "Container is running",
				status: "running",
			};
		}
	}
	return {
		code: "SUCCESS",
		message: "Container is stopped",
		status: "exited",
	};
}
