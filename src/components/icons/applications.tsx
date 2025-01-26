/*
 * APPLICATIONS ICON
 * -----------------
 * The icon for an application in a big-value card.
 */
import Image from "next/image";

export default function ApplicationsIcon({ size = 48 }: { size?: number }) {
	return (
		<>
			<Image
				src="/img/icons/applications/light.svg"
				alt="Applications Icon"
				width={size}
				height={size}
				className="select-none dark:hidden"
			/>
			<Image
				src="/img/icons/applications/dark.svg"
				alt="Applications Icon"
				width={size}
				height={size}
				className="hidden select-none dark:block"
			/>
		</>
	);
}
