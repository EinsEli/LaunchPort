import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function LaunchPortInfoFooter() {
	const commitSha = process.env.COMMIT_SHA;

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
				{/* {process.env.COMMIT_SHA?.substring(0, 7) || "Local Development"} */}
				1.0.0 •{" "}
				{commitSha ? (
					<Link
						className="transition-colors hover:text-muted-foreground p-1 bg-muted text-xs font-mono rounded-md"
						href={`https://github.com/EinsEli/LaunchPort/commit/${commitSha}`}
					>
						{commitSha.substring(0, 7)}
					</Link>
				) : (
					"Local Development"
				)}
			</p>
		</div>
	);
}
