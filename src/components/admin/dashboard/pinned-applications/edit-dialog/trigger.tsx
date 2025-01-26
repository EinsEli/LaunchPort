"use client";

import { dashboardEditPinnedDialogOpen } from "@/atoms/dashboard";
import { useSetAtom } from "jotai";
import { MdModeEdit } from "react-icons/md";

export default function EditPinnedAppsDialogTrigger() {
	const setEditDialogOpen = useSetAtom(dashboardEditPinnedDialogOpen);

	return (
		<div
			className="group relative flex w-fit cursor-pointer items-center"
			onClick={() => setEditDialogOpen(true)}
		>
			<h2 className="text-xl font-semibold text-primary">
				Pinned Applications
			</h2>
			<div className="flex -translate-x-2 transform opacity-0 blur-sm transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 group-hover:blur-0">
				<MdModeEdit size={22} />
			</div>
		</div>
	);
}
