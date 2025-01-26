/*
 * AUTHENTICATION FORM
 * -----------------
 * This component is responsible for rendering the authentication form.
 */
"use client";

import { motion, AnimatePresence } from "motion/react";
import Login from "./steps/login";
import Register from "./steps/register";
import { useAtomValue } from "jotai";
import { authenticationFormSelectedTabAtom } from "@/atoms/auth";
import { useRef } from "react";

export default function AuthContainer() {
	const selectedTab = useAtomValue(authenticationFormSelectedTabAtom);
	const containerRef = useRef<HTMLDivElement | null>(null);

	return (
		<div ref={containerRef}>
			<AnimatePresence mode="wait">
				<motion.div
					key={selectedTab ? selectedTab : "empty"}
					initial={{
						x: -10,
						opacity: 0,
						filter: "blur(4px)",
					}}
					animate={{
						x: 0,
						opacity: 1,
						filter: "blur(0px)",
					}}
					exit={{
						x: 10,
						opacity: 0,
						filter: "blur(4px)",
					}}
					transition={{ duration: 0.2 }}
					className="w-96"
				>
					{selectedTab === "login" && <Login />}
					{selectedTab === "register" && <Register />}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
