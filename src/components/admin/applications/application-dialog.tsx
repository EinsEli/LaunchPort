"use client";
import {
	Modal,
	ModalContent,
	ModalDescription,
	ModalHeader,
	ModalTitle,
} from "@/components/ui/modal";
import { useAtom, useAtomValue } from "jotai";
import {
	applicationsAddDialogOpenAtom,
	applicationsSelectedApplication,
} from "@/atoms/applications";
import { useEffect } from "react";
import ApplicationForm from "./application-form";
import { useSearchParams } from "next/navigation";

export default function ApplicationDialog() {
	const [open, setOpen] = useAtom(applicationsAddDialogOpenAtom);
	const application = useAtomValue(applicationsSelectedApplication);

	const searchParams = useSearchParams();
	const slug = searchParams.get("slug");
	const origin = searchParams.get("origin");

	// Auto-open if slug or origin are set
	useEffect(() => {
		if (slug || origin) {
			setOpen(true);
		}
	}, [setOpen, slug, origin]);

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalContent className="sm:max-w-[1024px]">
				<ModalHeader>
					<ModalTitle>
						{application ? "Edit" : "Add New"} Application{" "}
					</ModalTitle>
					<ModalDescription>
						{application
							? "Edit the details of the application."
							: "Create a new application by filling the form below."}
					</ModalDescription>
				</ModalHeader>
				<ApplicationForm />
			</ModalContent>
		</Modal>
	);
}
