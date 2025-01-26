/*
 * PINNED APPLICATIONS
 * -----------------
 * Wrapper component for the pinned applications section on the home dashboard.
 */

import PinnedApplicationsGridWrapper from "./grid";
import EditPinnedWrapper from "./edit-dialog";

export default function PinnedApplications() {
	return (
		<div>
			<EditPinnedWrapper />
			<PinnedApplicationsGridWrapper />
		</div>
	);
}
