import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, ...props }, ref) => {
		return (
			<div className="relative flex items-center">
				{icon && <span className="absolute left-3">{icon}</span>}
				<input
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background py-2 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className,
						icon ? "pl-9" : "pl-3",
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
