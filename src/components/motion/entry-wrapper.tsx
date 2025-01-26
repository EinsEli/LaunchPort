/*
 * ENTRY WRAPPER
 * -------------------------
 * This component is used to wrap an item that should be
 * animated with when it enters the viewport.
 */
"use client";

import { motion } from "motion/react";

export default function ItemEntryWrapper({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const itemVariants = {
		hidden: { opacity: 0, y: 8 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<motion.div
			variants={itemVariants}
			animate="visible"
			initial="hidden"
			className={className}
		>
			{children}
		</motion.div>
	);
}
