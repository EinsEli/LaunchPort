import getPasskeys from "@/app/(server)/actions/admin/settings/get-passkeys";
import { Separator } from "@/components/ui/separator";
import EnrollPasskeyButton from "./enroll-button";
import PasskeyEntry from "./entry";
import SettingsSectionCard from "../section-card";

export default async function PasskeySettings() {
	const passkeys = await getPasskeys();

	return (
		<SettingsSectionCard
			title="Passkeys"
			description="Enroll remove and manage your passkeys here."
		>
			<div className="flex flex-col gap-4">
				{passkeys.map((passkey, index) => (
					<PasskeyEntry key={index} passkey={passkey} index={index} />
				))}
				{passkeys.length > 0 && <Separator />}
				<EnrollPasskeyButton />
			</div>
		</SettingsSectionCard>
	);
}
