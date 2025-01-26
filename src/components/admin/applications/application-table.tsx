/*
 * APPLICATION TABLE
 * -----------------
 * Table to display all applications created by the logged-in user.
 */
"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Application } from "@prisma/client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FaLock } from "react-icons/fa";
import { LuArrowDown, LuArrowUp, LuGlobe, LuSearch } from "react-icons/lu";
import Image from "next/image";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";
import { Badge } from "@/components/ui/badge";
import { useSetAtom } from "jotai";
import {
	applicationsAddDialogOpenAtom,
	applicationsDeleteDialogOpenAtom,
	applicationsSelectedApplication,
} from "@/atoms/applications";
import ItemEntryWrapper from "@/components/motion/entry-wrapper";
import Link from "next/link";
import { TbArrowUpRight } from "react-icons/tb";

export default function ApplicationTable({
	applications,
}: {
	applications: Application[];
}) {
	const columns: ColumnDef<Application>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "icon",
			header: "Icon",
			cell: ({ row }) => (
				<Image
					src={row.original.icon}
					alt="icon"
					width={24}
					height={24}
				/>
			),
		},
		{
			accessorKey: "friendlyName",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="-ml-4"
				>
					Name
					{column.getIsSorted() === "asc" && <LuArrowUp />}
					{column.getIsSorted() === "desc" && <LuArrowDown />}
				</Button>
			),
			cell: ({ row }) => (
				<div className="line-clamp-1 w-32">
					{row.getValue("friendlyName")}
				</div>
			),
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: ({ row }) => (
				<div className="line-clamp-1 max-w-96 text-ellipsis">
					{row.getValue("description")}
				</div>
			),
		},
		{
			accessorKey: "urls",
			header: "URLs",
			cell: ({ row }) => (
				<div className="line-clamp-1 flex flex-row gap-2">
					{(row.getValue("urls") as string[])
						.slice(0, 1)
						.map((url) => (
							<Link href={`https://${url}`} key={url}>
								<Badge
									variant="secondary"
									className="line-clamp-1 w-fit"
								>
									{url}
								</Badge>
							</Link>
						))}
					{(row.getValue("urls") as string[]).length > 1 && (
						<Badge
							variant="secondary"
							className="line-clamp-1 w-fit"
						>
							+{(row.getValue("urls") as string[]).length - 1}{" "}
							more
						</Badge>
					)}
				</div>
			),
		},
		{
			accessorKey: "isPublic",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="-ml-4"
				>
					Visibility
					{column.getIsSorted() === "asc" && <LuArrowUp />}
					{column.getIsSorted() === "desc" && <LuArrowDown />}
				</Button>
			),
			cell: ({ row }) => (
				<div className="flex flex-row items-center gap-2">
					{row.getValue("isPublic") ? (
						<>
							<LuGlobe />
							<span>Public</span>
						</>
					) : (
						<>
							<FaLock />
							<span>Private</span>
						</>
					)}
				</div>
			),
		},
		{
			id: "actions",
			cell: ({ row }) => (
				<Link
					href={`/applications/${row.original.slug}`}
					target="_blank"
					className="flex justify-end text-muted-foreground"
				>
					<Button variant="ghost" className="size-6 p-0">
						<TbArrowUpRight size={48} />
					</Button>
				</Link>
			),
		},
	];

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{},
	);
	const [rowSelection, setRowSelection] = useState({});

	const setOpenAddNewDialog = useSetAtom(applicationsAddDialogOpenAtom);
	const setSelectedApplication = useSetAtom(applicationsSelectedApplication);
	const setOpenDeleteDialog = useSetAtom(applicationsDeleteDialogOpenAtom);

	const table = useReactTable({
		data: applications,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="flex max-h-screen flex-col gap-2">
			<div className="flex flex-row items-center gap-4">
				<Input
					placeholder="Search applications"
					icon={<LuSearch />}
					className="w-full sm:max-w-96"
					value={
						(table
							.getColumn("friendlyName")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn("friendlyName")
							?.setFilterValue(event.target.value)
					}
				/>
				{/* Add / Edit application dialog */}
				<Button
					onClick={() => {
						setSelectedApplication(undefined);
						setOpenAddNewDialog(true);
					}}
				>
					Add new
				</Button>
				{/* Delete application dialog */}
				{table.getFilteredSelectedRowModel().rows.length !== 0 && (
					<ItemEntryWrapper>
						<Button
							variant="destructive"
							onClick={() => setOpenDeleteDialog(true)}
						>
							Delete
						</Button>
					</ItemEntryWrapper>
				)}
				<DeleteDialog table={table} />
			</div>
			<div className="overflow-hidden rounded-md border bg-background">
				<Table className="h-full overflow-scroll">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="cursor-pointer border-b border-border transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
									onClick={(event) => {
										if (
											!["BUTTON", "A"].includes(
												(event.target as HTMLElement)
													.tagName,
											)
										) {
											setSelectedApplication(
												row.original,
											);
											setOpenAddNewDialog(true);
										}
									}}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-28 text-center"
								>
									No applications.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex flex-row justify-between gap-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
