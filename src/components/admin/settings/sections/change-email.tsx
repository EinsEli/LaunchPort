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
import { zodEmailObject } from "@/types/zod";
import { changeEmail } from "../../../../app/(server)/actions/admin/settings/change-email";
import SettingsSectionCard from "./section-card";

const changeEmailSchema = z
	.object({
		newEmail: zodEmailObject,
		confirmNewEmail: zodEmailObject,
	})
	.refine(
		(data) =>
			data.newEmail.toLowerCase() === data.confirmNewEmail.toLowerCase(),
		{
			message: "Emails must match",
			path: ["confirmNewEmail"],
		},
	);

export default function ChangeEmail() {
	const { data: session, update } = useSession();
	const form = useForm<z.infer<typeof changeEmailSchema>>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: {
			newEmail: "",
			confirmNewEmail: "",
		},
	});

	if (!session) return null;

	function onSubmit(data: z.infer<typeof changeEmailSchema>) {
		if (
			session?.user?.email &&
			data.newEmail.toLowerCase() === session.user.email.toLowerCase()
		) {
			return form.setError("newEmail", {
				type: "manual",
				message: "New email must be different from the current email",
			});
		} else {
			changeEmail(data.newEmail).then((response) => {
				if (response.code === "SUCCESS") {
					update();
					toast.success("Email updated successfully");
					form.reset();
				} else {
					toast.error(response.message);
				}
			});
		}
	}

	return (
		<SettingsSectionCard
			title="Email"
			description="Change your email address here."
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="newEmail"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										className="h-10"
										type="email"
										placeholder="New Email address"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmNewEmail"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										className="h-10"
										type="email"
										placeholder="Confirm new Email address"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Separator orientation="horizontal" />
					<Button
						type="submit"
						disabled={
							form.formState.isSubmitting ||
							!form.formState.isValid ||
							form.watch().newEmail.toLowerCase() ===
								session.user!.email!.toLowerCase()
						}
					>
						{form.formState.isSubmitting && (
							<TbLoader className="mr-2 animate-spin text-2xl text-primary text-white" />
						)}{" "}
						Update
					</Button>
				</form>
			</Form>
		</SettingsSectionCard>
	);
}
