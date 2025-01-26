/*
 * DELETE DIALOG
 * -----------------
 * Dialog for deleting selected applications in the application table.
 */
import { applicationsDeleteDialogOpenAtom } from "@/atoms/applications";
import { Button } from "@/components/ui/button";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
} from "@/components/ui/modal";
import { Application } from "@prisma/client";
import { Table } from "@tanstack/react-table";
import { useAtom } from "jotai";
import Image from "next/image";
import deleteApplications from "@/app/(server)/actions/admin/applications/delete-applications";
import { revalidatePage } from "@/app/(server)/actions/revalidate";
import { toast } from "sonner";

export default function DeleteDialog({ table }: { table: Table<Application> }) {
	const [openDialog, setOpenDialog] = useAtom(
		applicationsDeleteDialogOpenAtom,
	);

	async function handleDelete() {
		const selectedApplications = table
			.getFilteredSelectedRowModel()
			.rows.map((row) => row.original);

		deleteApplications(selectedApplications)
			.then(() => {
				setOpenDialog(false);
				revalidatePage();
				table.setRowSelection({});
				toast.success("Applications deleted successfully.");
			})
			.catch(() => {
				toast.error("Failed to delete applications.");
			});
	}

	return (
		<div>
			<Modal open={openDialog} onOpenChange={setOpenDialog}>
				<ModalContent>
					<ModalHeader>
						<ModalTitle>Delete selected applications?</ModalTitle>
						<ModalDescription>
							This action will delete{" "}
							<b>
								{
									table.getFilteredSelectedRowModel().rows
										.length
								}
							</b>{" "}
							application(s):
						</ModalDescription>
						<ul className="mt-4 flex max-h-80 flex-col gap-4 overflow-y-auto p-1 sm:px-2">
							{table
								.getFilteredSelectedRowModel()
								.rows.map((row) => (
									<li
										key={row.id}
										className="flex flex-row items-center gap-2 text-sm text-primary"
									>
										<Image
											src={row.original.icon}
											alt="icon"
											width={20}
											height={20}
										/>
										{row.original.friendlyName}
									</li>
								))}
						</ul>
					</ModalHeader>
					<ModalFooter>
						<Button
							onClick={() => setOpenDialog(false)}
							variant="secondary"
						>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}
