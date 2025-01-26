import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LaunchPortInfoFooter() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 text-center text-sm font-medium text-muted-foreground/25">
			<Separator className="mb-4 mt-2" />
			<Logo variant="icon" animated size={44} colorScheme="border" />
			<p>
				<Link
					className="transition-colors hover:text-muted-foreground hover:underline"
					href="https://einseli.me"
				>
					Version
				</Link>{" "}
				1.0.0 • {process.env.COMMIT_SHA || "Local Development"}
			</p>
		</div>
	);
}
