"use client";
import { signIn } from "next-auth/webauthn";
import { Button } from "@/components/ui/button";
import { GoPasskeyFill } from "react-icons/go";

export default function EnrollPasskeyButton() {
	return (
		<Button
			variant="outline"
			className="w-full"
			onClick={() => signIn("passkey", { action: "register" })}
		>
			<GoPasskeyFill className="mr-2" size={16} />
			Register Passkey
		</Button>
	);
}
