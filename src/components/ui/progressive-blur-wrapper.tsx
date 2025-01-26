import { ProgressiveBlur } from "./progressive-blur";

export default function ProgressiveBlurWrapper({
	children,
	side = "bottom",
	height = 48,
}: {
	children: React.ReactNode;
	side?: "top" | "bottom" | "both";
	height?: number;
}) {
	return (
		<div className="relative h-full w-full">
			{(side === "top" || side === "both") && (
				<ProgressiveBlur
					side="top"
					strength={32}
					style={{
						position: "sticky",
						top: 0,
						left: 0,
						right: 0,
						zIndex: 10,
						height: height,
					}}
				/>
			)}
			{children}
			{(side === "bottom" || side === "both") && (
				<ProgressiveBlur
					side="bottom"
					strength={32}
					style={{
						position: "sticky",
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 10,
						height: height,
					}}
				/>
			)}
		</div>
	);
}
