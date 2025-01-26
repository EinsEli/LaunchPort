/*
 * SIDEBAR ENTRYPOINT
 * ------------------
 * This is the entrypoint for the sidebar component.
 * It fetches the initial state of the sidebar from the cookies and passes it to the sidebar component.
 */
import { getInitialSidebarState } from "@/app/(server)/actions/cookies/sidebar-state";
import SidebarContent from "./content";

export default async function Sidebar() {
	const isCollapsed = await getInitialSidebarState();

	return <SidebarContent initialState={isCollapsed} />;
}
