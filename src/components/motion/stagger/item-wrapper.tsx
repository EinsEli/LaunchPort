/*
 * STAGGER ITEM WRAPPER
 * -------------------------
 * This component is used to wrap individual items you want to stagger.
 * It is used in conjunction with the stagger container wrapper.
 */
"use client";

import { motion } from "motion/react";
import { createElement } from "react";

export default function StaggerItemWrapper({
	children,
	className,
	type = "div",
}: {
	children: React.ReactNode;
	className?: string;
	type?:
		| "div"
		| "span"
		| "section"
		| "article"
		| "aside"
		| "header"
		| "footer"
		| "tr";
}) {
	const itemVariants = {
		hidden: { opacity: 0, y: 16 },
		visible: { opacity: 1, y: 0 },
	};

	return createElement(
		motion[type],
		{ variants: itemVariants, className },
		children,
	);
}
