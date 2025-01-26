"use client";
import DashboardCard from "@/components/ui/dashboard-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import useIsMobile from "@/hooks/useIsMobile";

export default function BigValueCard({
	value,
	label,
	icon,
	isLoading = false,
	...props
}: {
	value: string;
	label: string;
	icon: React.ReactNode;
	isLoading?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
	const isMobile = useIsMobile();

	return (
		<Popover>
			<DashboardCard {...props}>
				<PopoverTrigger asChild>
					<div className="flex h-full w-full flex-row items-center">
						<div className="flex h-full w-full flex-col justify-center py-2">
							{isLoading ? (
								<Skeleton className="mb-4 h-5 w-4/5 sm:h-6" />
							) : (
								<span className="line-clamp-1 text-2xl font-semibold sm:text-3xl">
									{value}
								</span>
							)}
							{isLoading ? (
								<Skeleton className="h-4 w-2/5" />
							) : (
								<span className="line-clamp-1 text-sm font-medium text-gray-500">
									{label}
								</span>
							)}
						</div>
						<div className="pointer-events-none flex-shrink-0 select-none">
							{icon}
						</div>
					</div>
				</PopoverTrigger>
			</DashboardCard>
			{isMobile && !isLoading && <PopoverContent>{value}</PopoverContent>}
		</Popover>
	);
}
