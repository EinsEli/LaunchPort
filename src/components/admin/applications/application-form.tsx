import { useEffect, useCallback, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import createApplication from "@/app/(server)/actions/admin/applications/create-application";
import { toast } from "sonner";
import { revalidatePage } from "@/app/(server)/actions/revalidate";
import { FaLock } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";
import { InputTags } from "@/components/ui/input-tags";
import updateApplication from "@/app/(server)/actions/admin/applications/update-application";
import { useAtomValue, useSetAtom } from "jotai";
import {
	applicationsAddDialogOpenAtom,
	applicationsSelectedApplication,
} from "@/atoms/applications";
import { Button } from "@/components/ui/button";
import { ModalFooter } from "@/components/ui/modal";
import { useSearchParams } from "next/navigation";

const applicationFormSchema = z.object({
	slug: z
		.string()
		.regex(
			/^[a-z0-9-_]+$/,
			"Only lowercase letters, numbers, hyphens, and underscores are allowed",
		)
		.nonempty(),
	friendlyName: z.string(),
	description: z.string(),
	icon: z.string().nonempty(),
	isPublic: z.boolean(),
	urls: z.array(z.string()),
	containerNames: z.array(z.string()),
});

export default function ApplicationForm() {
	const application = useAtomValue(applicationsSelectedApplication);
	const setOpen = useSetAtom(applicationsAddDialogOpenAtom);
	const searchParams = useSearchParams();
	const slugParam = searchParams.get("slug");
	const originParam = searchParams.get("origin");

	const defaultValues = useMemo(
		() => ({
			slug: application?.slug || "",
			friendlyName: application?.friendlyName || "",
			description: application?.description || "",
			icon: application?.icon || "/img/logo/icon-border.svg",
			isPublic: application?.isPublic || false,
			urls: application?.urls || [],
			containerNames: application?.containerNames || [],
		}),
		[application],
	);

	const form = useForm<z.infer<typeof applicationFormSchema>>({
		resolver: zodResolver(applicationFormSchema),
		defaultValues: defaultValues,
	});

	// Reset form when selected application changes
	useEffect(() => {
		form.reset(defaultValues);
	}, [application, form, defaultValues]);

	// Load default values from query params
	useEffect(() => {
		form.reset(defaultValues);
		if (slugParam) {
			form.setValue("slug", slugParam);
		}
		if (originParam) {
			form.setValue("urls", [originParam]);
		}
	}, [application, form, defaultValues, slugParam, originParam]);

	// Auto-generate slug from friendly name
	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === "friendlyName" && !slugParam) {
				const transformedName = value
					.friendlyName!.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-_]/g, "")
					.trim();
				form.setValue("slug", transformedName);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, slugParam]);

	const handleFileUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					form.setValue("icon", reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		},
		[form],
	);

	async function onSubmit(values: z.infer<typeof applicationFormSchema>) {
		if (application) {
			return updateApplication({
				id: application.id,
				userId: application.userId,
				createdAt: application.createdAt,
				updatedAt: new Date(),
				isPinned: application.isPinned,
				...values,
			}).then((response) => {
				if (response.code === "SUCCESS") {
					setOpen(false);
					revalidatePage();
					toast.success(response.message);
				} else {
					toast.error(response.message);
				}
			});
		}
		return createApplication(values).then((response) => {
			if (response.code === "SUCCESS") {
				setOpen(false);
				toast.success(response.message);
				history.replaceState({}, "", location.pathname);
				revalidatePage();
				setTimeout(() => {
					form.reset(defaultValues);
				}, 300);
			} else {
				toast.error(response.message);
			}
		});
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
					className="flex max-h-[calc(100vh-256px)] flex-col gap-4 overflow-y-auto px-4 py-1 sm:px-1"
				>
					<div className="flex flex-col gap-4 sm:flex-row">
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem className="flex h-40 w-full flex-col gap-4">
									<FormControl>
										<div className="flex h-full w-full flex-row items-center gap-6">
											<div className="relative aspect-square h-24 p-2">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={
														field.value ||
														"/img/logo/icon-border.svg"
													}
													alt="Icon"
												/>
											</div>
											<div className="flex h-full w-full flex-col justify-between gap-4">
												<div className="space-y-2">
													<FormLabel>
														Upload image
													</FormLabel>
													<Input
														type="file"
														accept="image/*"
														onChange={
															handleFileUpload
														}
													/>
												</div>
												<div className="space-y-2">
													<FormLabel>
														Image URL
													</FormLabel>
													<Input
														placeholder="Icon URL or Base64 data URI"
														{...field}
													/>
												</div>
												<FormMessage />
											</div>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="flex w-full flex-col gap-4">
							<FormField
								control={form.control}
								name="friendlyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Friendly Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="slug"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					{/* Description */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="isPublic"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Visibility</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) =>
											field.onChange(value === "true")
										}
										value={field.value ? "true" : "false"}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="true">
												<div className="flex flex-row items-center">
													<LuGlobe className="mr-2" />
													Public
												</div>
											</SelectItem>
											<SelectItem value="false">
												<div className="flex flex-row items-center">
													<FaLock className="mr-2" />
													Private
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="urls"
						render={({ field }) => (
							<FormItem>
								<FormLabel>URLs</FormLabel>
								<InputTags
									{...field}
									placeholder="URLs that redirect to the application."
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="containerNames"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Container Names</FormLabel>
								<InputTags
									{...field}
									placeholder="Containers assigned to the application."
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<ModalFooter>
				<Button
					type="button"
					variant="secondary"
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>
				<Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
			</ModalFooter>
		</>
	);
}
