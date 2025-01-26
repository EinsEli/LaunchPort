/*
 * ENTRY-LIST
 * ----------
 * This file contains the navigation entries for the admin dashboard.
 * They are used to populate the sidebar and mobile navigation.
 */
import {
	PiGear,
	PiGearFill,
	PiHouse,
	PiHouseFill,
	PiSquaresFour,
	PiSquaresFourFill,
} from "react-icons/pi";

export const navigationEntries = [
	{
		label: "Dashboard",
		icon: <PiHouse />,
		iconSelected: <PiHouseFill />,
		href: "/admin/dashboard",
	},
	{
		label: "Applications",
		icon: <PiSquaresFour />,
		iconSelected: <PiSquaresFourFill />,
		href: "/admin/applications",
	},
	{
		label: "Settings",
		icon: <PiGear />,
		iconSelected: <PiGearFill />,
		href: "/admin/settings",
	},
];
