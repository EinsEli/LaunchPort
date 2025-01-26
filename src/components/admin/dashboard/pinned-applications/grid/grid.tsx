/*
 * APPLICATION GRID
 * -----------------
 * The grid of pinned applications on the home dashboard.
 */
"use client";

import { Application } from "@prisma/client";
import PinnedApplicationCard from "./application-card";
import StaggerContainerWrapper from "@/components/motion/stagger/container-wrapper";
import StaggerItemWrapper from "@/components/motion/stagger/item-wrapper";

export default function ApplicationGrid({
	applications,
}: {
	applications: Application[];
}) {
	return (
		<StaggerContainerWrapper
			staggerDelay={0.03}
			className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6"
		>
			{applications.map((application: Application) => (
				<StaggerItemWrapper key={application.id}>
					<PinnedApplicationCard application={application} />
				</StaggerItemWrapper>
			))}
		</StaggerContainerWrapper>
	);
}
