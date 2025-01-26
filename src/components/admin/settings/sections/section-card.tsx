import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function SettingsSectionCard({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h2 className="text-xl font-semibold">{title}</h2>
				</CardTitle>
				<CardDescription>
					<p className="text-sm font-medium text-muted-foreground">
						{description}
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
