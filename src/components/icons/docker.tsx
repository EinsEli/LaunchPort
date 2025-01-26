/*
 * DOCKER ICON
 * -----------------
 * The icon for Docker in a big-value card.
 */
import Image from "next/image";

export default function DockerIcon({ size = 48 }: { size?: number }) {
	return (
		<>
			<Image
				src="/img/icons/docker/light.svg"
				alt="Docker Logo"
				width={size}
				height={size}
				className="select-none dark:hidden"
			/>
			<Image
				src="/img/icons/docker/dark.svg"
				alt="Docker Logo"
				width={size}
				height={size}
				className="hidden select-none dark:block"
			/>
		</>
	);
}
