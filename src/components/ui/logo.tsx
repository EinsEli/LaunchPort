"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Logo({
	size,
	variant = "combined",
	animated = false,
	colorScheme = "primary",
}: {
	size: number;
	variant?: "icon" | "wordmark" | "combined" | "icon-border";
	animated?: boolean;
	colorScheme?: "primary" | "muted-foreground" | "secondary" | "border";
}) {
	const animationProperties = {
		backgroundSize: "300% 300%",
		rotate: 360,
		filter: `$blur(${size / 2}px)`,
		background: `linear-gradient(90deg, hsl(var(--${colorScheme})) 0%, #329DF7 0%, #D85E97 33%, #F7644D 66%, #FEB028 100%)`,
		transition: {
			duration: 0.75,
			ease: "backInOut",
		},
	};

	return (
		<>
			{animated && (
				<motion.div
					initial="initial"
					whileHover={["hover", "hoverLoop"]}
					whileTap="hover"
					variants={{
						initial: {
							background: `linear-gradient(90deg, hsl(var(--${colorScheme})) 100%, #329DF7 100%, #D85E97 100%, #F7644D 100%, #FEB028 100%)`,
						},
						hover: animationProperties,
						hoverLoop: {
							backgroundSize: [
								"300% 300%",
								"150% 150%",
								"200% 200%",
							],
							backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
							transition: {
								duration: 10,
								repeat: Infinity,
								repeatType: "reverse",
							},
						},
					}}
					style={{
						width: size,
						height: size,
						maskSize: "contain",
						WebkitMaskSize: "contain",
						maskRepeat: "no-repeat",
						WebkitMaskRepeat: "no-repeat",
						maskPosition: "center",
						WebkitMaskPosition: "center",
						maskImage: `url(/img/logo/${variant}.svg)`,
						WebkitMaskImage: `url(/img/logo/${variant}.svg)`,
					}}
					className="drag-none flex-shrink-0 select-none"
				/>
			)}
			{!animated && (
				<Image
					src={`/img/logo/${variant}.svg`}
					alt="Logo"
					height={size}
					width={
						variant === "combined" || variant === "wordmark"
							? size * 4.5
							: size
					}
					className="drag-none flex-shrink-0 select-none invert dark:invert-0"
				/>
			)}
		</>
	);
}
