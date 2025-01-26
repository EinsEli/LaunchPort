"use client";
import { FaKey } from "react-icons/fa";
import { Passkey } from "@/app/(server)/actions/admin/settings/get-passkeys";
import { Button } from "@/components/ui/button";
import { TbX } from "react-icons/tb";
import deletePasskey from "@/app/(server)/actions/admin/settings/delete-passkey";
import { toast } from "sonner";
import { revalidatePage } from "@/app/(server)/actions/revalidate";

export default function PasskeyEntry({
	passkey,
	index,
}: {
	passkey: Passkey;
	index: number;
}) {
	return (
		<div className="flex flex-row items-center justify-between gap-2 rounded-md border border-border px-4 py-2 hover:bg-primary-foreground">
			<div className="flex flex-row items-center gap-4">
				<FaKey size={22} />
				<div className="flex flex-col justify-center">
					<p className="text-sm font-semibold">Passkey {index + 1}</p>
					<p className="text-xs font-medium text-muted-foreground">
						Created at {passkey.createdAt.toUTCString()}
					</p>
				</div>
			</div>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => {
					deletePasskey(passkey.credentialID).then((response) => {
						if (response.code === "SUCCESS") {
							toast.success("Passkey deleted successfully.");
							revalidatePage();
						} else {
							toast.error(response.message);
						}
					});
				}}
			>
				<TbX className="text-3xl text-red-500" />
			</Button>
		</div>
	);
}
