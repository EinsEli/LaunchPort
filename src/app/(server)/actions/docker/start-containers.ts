"use server";

import { docker, getContainerByName } from "@/lib/docker";
import { ContainerActionResponse } from "@/types/response";

export default async function startContainers(
	containers: string[],
): Promise<ContainerActionResponse> {
	if (!containers.length) {
		return {
			code: "INVALID_ARGUMENTS" as const,
			message: "No containers to start",
		};
	}

	const startPromises = containers.map(async (container) => {
		try {
			const cnt = await getContainerByName(container);
			if (!cnt) {
				const response = {
					code: "NOT_FOUND" as const,
					message: `Container ${container} not found`,
				};
				console.error(response.message);
				return response;
			} else if (cnt.State !== "running") {
				await docker.getContainer(cnt.Id).start();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error("Error starting container", container, error);
			return {
				code: "SERVER_ERROR" as const,
				message: `Error starting container ${container}: ${error.reason}`,
			};
		}
		return null;
	});

	const results = await Promise.all(startPromises);

	const errorResponse = results.find((result) => result !== null);
	if (errorResponse) {
		return errorResponse;
	}

	return {
		code: "SUCCESS",
		message: "Containers started",
	};
}
