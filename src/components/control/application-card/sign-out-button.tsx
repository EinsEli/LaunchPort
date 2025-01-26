"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function SignOutButton({
	children,
	variant = "default",
}: {
	children: React.ReactNode;
	variant?: "default" | "secondary";
}) {
	const pathname = usePathname();

	return (
		<Button
			className="w-full"
			variant={variant}
			onClick={() =>
				signOut({
					redirect: true,
					redirectTo: `/auth?rd=${pathname}`,
				})
			}
		>
			{children}
		</Button>
	);
}
