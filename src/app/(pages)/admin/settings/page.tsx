import LaunchPortInfoFooter from "@/components/admin/settings/launchport-info-footer";
import ChangeAvatar from "@/components/admin/settings/sections/change-avatar";
import ChangeEmail from "@/components/admin/settings/sections/change-email";
import ChangeName from "@/components/admin/settings/sections/change-name";
import ChangePassword from "@/components/admin/settings/sections/change-password";
import DeleteAccount from "@/components/admin/settings/sections/delete-account";
import PasskeySettings from "@/components/admin/settings/sections/passkey";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Page() {
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin/settings">
							Settings
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div>
				<h1 className="text-2xl font-semibold">Settings</h1>
				<p className="text-sm font-medium text-muted-foreground">
					Manage your account settings here.
				</p>
			</div>
			<div className="flex flex-col gap-4 sm:grid xl:grid-cols-2 4xl:grid-cols-3">
				<ChangeName />
				<ChangeEmail />
				<ChangeAvatar />
				<ChangePassword />
				<DeleteAccount />
				<PasskeySettings />
			</div>
			<LaunchPortInfoFooter />
		</>
	);
}
