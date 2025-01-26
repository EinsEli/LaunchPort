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
import { useCallback } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { changeAvatar } from "@/app/(server)/actions/admin/settings/change-avatar";

export default function ChangeAvatar() {
	const { data: session, update } = useSession();
	const changeAvatarSchema = z.object({
		image: z.string().nonempty(),
	});

	const form = useForm<z.infer<typeof changeAvatarSchema>>({
		resolver: zodResolver(changeAvatarSchema),
		defaultValues: {
			image: "",
		},
	});

	const handleFileUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					form.setValue("image", reader.result as string, {
						shouldValidate: true,
						shouldDirty: true,
					});
				};
				reader.readAsDataURL(file);
			}
		},
		[form],
	);

	if (!session) return null;

	const onSubmit = (data: z.infer<typeof changeAvatarSchema>) => {
		changeAvatar(data.image).then((response) => {
			if (response.code === "SUCCESS") {
				update();
				toast.success("Profile picture updated successfully");
				setTimeout(() => {
					form.reset();
				}, 300);
			} else {
				toast.error(response.message);
			}
		});
	};

	return (
		<SettingsSectionCard
			title="Avatar"
			description="Set your profile picture here."
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem className="flex flex-col gap-4">
									<FormControl>
										<div className="flex flex-row items-center gap-6">
											<Avatar className="aspect-square size-36 rounded-2xl">
												<AvatarImage
													className="rounded-2xl"
													src={
														form.getValues(
															"image",
														) ||
														session?.user?.image ||
														""
													}
												/>
												<AvatarFallback className="rounded-2xl text-6xl">
													{session?.user?.name?.[0] ||
														"LP"}
												</AvatarFallback>
											</Avatar>
											<div className="flex h-36 w-full flex-col gap-4">
												<Input
													type="file"
													accept="image/*"
													onChange={handleFileUpload}
												/>
												<Input
													placeholder="Image URL or Base64 data URI"
													{...field}
												/>
												<FormMessage />
											</div>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<Separator orientation="horizontal" />
						<div className="flex flex-row gap-2">
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
								Save Changes
							</Button>
							<Button
								type="button"
								variant="secondary"
								onClick={() => {
									onSubmit({
										image: "",
									});
								}}
								disabled={
									form.formState.isSubmitting ||
									!session?.user?.image
								}
								className="w-fit"
							>
								Remove
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</SettingsSectionCard>
	);
}
