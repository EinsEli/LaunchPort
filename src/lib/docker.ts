/*
 * DOCKER UTILS
 * ------------
 * Utility functions / classes for interacting with Docker.
 */
import Docker, { ContainerInfo } from "dockerode";

const globalForDocker = globalThis as unknown as { docker: Docker };

export const docker =
	globalForDocker.docker ||
	new Docker({
		socketPath: "/var/run/docker.sock",
	});

if (process.env.NODE_ENV !== "production") globalForDocker.docker = docker;

export async function getContainerByName(
	name: string,
): Promise<ContainerInfo | undefined> {
	try {
		const containers = await docker.listContainers({ all: true });
		return containers.find((container) =>
			container.Names.includes(`/${name}`),
		);
	} catch (err) {
		console.error("Error listing containers", err);
		throw err;
	}
}
