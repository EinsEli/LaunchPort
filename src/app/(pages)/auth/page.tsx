"use client";

import AuthenticationForm from "@/components/auth/auth-container";
import Logo from "@/components/ui/logo";
import TopographicPattern from "@/components/ui/topographic-pattern";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
	const { status } = useSession();

	if (status === "authenticated") {
		redirect("/");
	}

	return (
		<div className="flex h-full w-full items-center justify-center">
			<TopographicPattern />
			<div className="absolute left-0 top-0 animate-entry-blur p-8 opacity-0">
				<Logo size={32} variant="combined" />
			</div>
			<AuthenticationForm />
		</div>
	);
}
