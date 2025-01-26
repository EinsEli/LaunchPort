import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DashboardCard({
	children,
	className,
	...props
}: {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card
			className={cn(
				"w-full overflow-clip rounded-xl transition-shadow duration-500 hover:shadow-xl",
				className,
			)}
			{...props}
		>
			<CardContent className="group h-full p-1.5 transition-all hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
				<div className="flex h-full w-full flex-row rounded-md bg-neutral-50 p-4 font-medium transition-colors group-hover:bg-neutral-100 dark:bg-neutral-900 dark:group-hover:bg-neutral-50/5">
					{children}
				</div>
			</CardContent>
		</Card>
	);
}
