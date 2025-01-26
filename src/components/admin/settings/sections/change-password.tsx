"use client";
import { useSession } from "next-auth/react";
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
import { zodPasswordObject } from "@/types/zod";
import { changePassword } from "@/app/(server)/actions/admin/settings/change-password";
import SettingsSectionCard from "./section-card";

export default function ChangePassword() {
	const { data: session, update } = useSession();
	const changePasswordSchema = z
		.object({
			oldPassword: z.string(),
			newPassword: zodPasswordObject,
			confirmPassword: zodPasswordObject,
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"],
		});

	const form = useForm<z.infer<typeof changePasswordSchema>>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	if (!session) return null;

	const onSubmit = (data: z.infer<typeof changePasswordSchema>) => {
		changePassword({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		}).then((response) => {
			if (response.code === "SUCCESS") {
				update();
				toast.success("Password changed successfully");
				form.reset();
			} else {
				toast.error(response.message);
			}
		});
	};

	return (
		<SettingsSectionCard
			title="Password"
			description="Change your account password."
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="oldPassword"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											className="mb-3 h-10"
											type="password"
											placeholder="Old Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											className="h-10"
											type="password"
											placeholder="New Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											className="h-10"
											type="password"
											placeholder="Confirm Password"
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
							disabled={
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
						>
							{form.formState.isSubmitting && (
								<TbLoader className="mr-2 animate-spin text-2xl text-primary text-white" />
							)}{" "}
							Change Password
						</Button>
					</div>
				</form>
			</Form>
		</SettingsSectionCard>
	);
}
