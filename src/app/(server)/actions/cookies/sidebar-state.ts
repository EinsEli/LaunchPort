/*
 * Action: cookies/sidebar-state.ts
 *
 * This action handles getting and setting the initial state of the sidebar.
 */
"use server";

import { cookies } from "next/headers";

export async function getInitialSidebarState() {
	const cookieStore = await cookies();
	return cookieStore.get("backuphub.sidebar-state")?.value === "true";
}

export async function setInitialSidebarState(isCollapsed: boolean) {
	const cookieStore = await cookies();
	cookieStore.set("backuphub.sidebar-state", isCollapsed.toString());
}
