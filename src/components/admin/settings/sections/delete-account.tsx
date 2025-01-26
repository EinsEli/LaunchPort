"use client";
import { signOut, useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TbLoader } from "react-icons/tb";
import { deleteAccount } from "@/app/(server)/actions/admin/settings/delete-account";
import SettingsSectionCard from "./section-card";

export default function DeleteAccount() {
	const { data: session } = useSession();
	const deleteAccountSchema = z.object({
		password: z.string(),
	});

	const form = useForm<z.infer<typeof deleteAccountSchema>>({
		resolver: zodResolver(deleteAccountSchema),
		defaultValues: {
			password: "",
		},
	});

	if (!session) return null;

	const onSubmit = (data: z.infer<typeof deleteAccountSchema>) => {
		deleteAccount(data.password).then((response) => {
			if (response.code === "SUCCESS") {
				signOut();
			} else {
				toast.error(response.message);
			}
		});
	};

	return (
		<SettingsSectionCard
			title="Delete Account"
			description="Remove your account and all associated data."
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											className="h-10"
											type="password"
											placeholder="Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Separator orientation="horizontal" />
						<Button
							type="submit"
							className="w-fit"
							variant="destructive"
							disabled={
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
						>
							{form.formState.isSubmitting && (
								<TbLoader className="mr-2 animate-spin text-2xl text-primary text-white" />
							)}{" "}
							Delete Account
						</Button>
					</div>
				</form>
			</Form>
		</SettingsSectionCard>
	);
}
