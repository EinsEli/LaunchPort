/*
 * EDIT DIALOG
 * -----------------
 * Dialog for editing pinned applications on the home dashboard.
 */
"use client";

import {
	Modal,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from "@/components/ui/modal";
import { Application } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form"; // ...import other form components if needed
import Link from "next/link";
import { toast } from "sonner";
import StaggerContainerWrapper from "@/components/motion/stagger/container-wrapper";
import StaggerItemWrapper from "@/components/motion/stagger/item-wrapper";
import { updateApplications } from "@/app/(server)/actions/admin/applications/update-pinned";
import { useAtom } from "jotai";
import { dashboardEditPinnedDialogOpen } from "@/atoms/dashboard";
import { useEffect } from "react";

const formSchema = z.object({
	apps: z.array(
		z.object({
			id: z.string(),
			isPinned: z.boolean().optional(),
		}),
	),
});

export default function EditPinnedApplicationsDialog({
	applications,
}: {
	applications: Application[];
}) {
	const [isOpen, setIsOpen] = useAtom(dashboardEditPinnedDialogOpen);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			apps: applications.map((app) => ({
				id: app.id,
				isPinned: app.isPinned,
			})),
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		updateApplications(data)
			.then(() => {
				toast.success("Updated pinned apps.");
			})
			.catch(() => {
				toast.error("Failed to update pinned apps.");
			});
	}

	useEffect(() => {
		form.reset({
			apps: applications.map((app) => ({
				id: app.id,
				isPinned: app.isPinned,
			})),
		});
	}, [applications, form]);

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>Edit pinned applications</ModalTitle>
					<ModalDescription>
						Select applications from the list below to pin them to
						the dashboard.
					</ModalDescription>
				</ModalHeader>
				<Separator className="hidden sm:block" />
				<div className="max-h-[512px] min-h-96 overflow-y-auto">
					{applications.length === 0 ? (
						<p className="mt-8 flex flex-col gap-1 text-center text-muted-foreground">
							No applications found.
							<Link href="/admin/applications">
								<Button variant="link">Add new</Button>
							</Link>
						</p>
					) : (
						<Form {...form}>
							<StaggerContainerWrapper
								staggerDelay={0.03}
								className="flex flex-col gap-2 px-4 sm:px-0"
							>
								{applications.map((application, index) => (
									<StaggerItemWrapper key={application.id}>
										<FormField
											control={form.control}
											name={`apps.${index}.isPinned`}
											render={({ field }) => (
												<div
													className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 transition-colors hover:bg-secondary"
													onClick={() =>
														field.onChange(
															!field.value,
														)
													}
												>
													<Checkbox
														checked={
															field.value ?? false
														}
														onCheckedChange={
															field.onChange
														}
													/>
													<div className="flex items-center gap-3">
														<Image
															src={
																application.icon
															}
															alt={
																application.friendlyName +
																" icon"
															}
															width={28}
															height={28}
														/>
														<div>
															<span className="text-md">
																{
																	application.friendlyName
																}
															</span>
															<p className="line-clamp-2 text-sm text-muted-foreground">
																{
																	application.description
																}
															</p>
														</div>
													</div>
												</div>
											)}
										/>
									</StaggerItemWrapper>
								))}
							</StaggerContainerWrapper>
						</Form>
					)}
				</div>
				<ModalFooter onClick={form.handleSubmit(onSubmit)}>
					<ModalClose className="w-full">Save</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
