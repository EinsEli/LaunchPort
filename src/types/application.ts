/*
 * APPLICATION TYPES
 * -----------------
 * This file contains the types / "enums" for the application entity.
 */

export type ApplicationState =
	| "starting"
	| "running"
	| "exited"
	| "stopping"
	| "loading"
	| "error";
