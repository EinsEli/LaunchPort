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
import SettingsSectionCard from "./section-card";
import { changeName } from "@/app/(server)/actions/admin/settings/change-name";

const changeEmailSchema = z.object({
	name: z.string().min(2),
});

export default function ChangeName() {
	const { data: session, update } = useSession();
	const form = useForm<z.infer<typeof changeEmailSchema>>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: {
			name: "",
		},
	});

	if (!session) return null;

	function onSubmit(data: z.infer<typeof changeEmailSchema>) {
		if (!session?.user) return;
		changeName(data.name).then((response) => {
			if (response.code === "SUCCESS") {
				update();
				toast.success("Email updated successfully");
				form.reset();
			} else {
				toast.error(response.message);
			}
		});
	}

	return (
		<SettingsSectionCard
			title="Display Name"
			description="Change your display name here."
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										className="h-10"
										type="text"
										placeholder={
											session.user?.name ||
											"New Display Name"
										}
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
							!form.formState.isValid
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
