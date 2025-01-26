"use server";

import { docker, getContainerByName } from "@/lib/docker";
import { ContainerActionResponse } from "@/types/response";

export default async function stopContainers(
	containers: string[],
): Promise<ContainerActionResponse> {
	if (!containers.length) {
		return {
			code: "INVALID_ARGUMENTS" as const,
			message: "No containers to stop",
		};
	}

	const stopPromises = containers.map(async (container) => {
		try {
			const cnt = await getContainerByName(container);
			if (!cnt) {
				const response = {
					code: "NOT_FOUND" as const,
					message: `Container ${container} not found`,
				};
				console.error(response.message);
				return response;
			} else if (cnt.State === "running") {
				await docker.getContainer(cnt.Id).stop();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Error stopping container", container, error);
			return {
				code: "SERVER_ERROR" as const,
				message: `Error stopping container ${container}: ${error.reason}`,
			};
		}
		return null;
	});

	const results = await Promise.all(stopPromises);

	const errorResponse = results.find((result) => result !== null);
	if (errorResponse) {
		return errorResponse;
	}

	return {
		code: "SUCCESS" as const,
		message: "Containers stopped",
	};
}
