/*
 * USER GREETING
 * -----------------
 * This component is responsible for rendering a greeting message to the user.
 */
import { auth } from "@/auth";

export default async function UserGreeting() {
	const session = await auth();

	return (
		<h1 className="text-2xl font-semibold">
			Hello, {session?.user?.name} 👋
		</h1>
	);
}
