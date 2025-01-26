/*
 * RESPONSE TYPES
 * --------------
 * This file contains the types for the responses that server-actions return.
 */

import { ApplicationState } from "./application";

/*
 * Shared types
 */
export type BaseResponse<ResponseCode extends string> = {
	code: ResponseCode;
	message: string;
};
export type CommonCodes =
	| "SUCCESS"
	| "NO_SESSION"
	| "NOT_FOUND"
	| "SERVER_ERROR"
	| "PERMISSION_DENIED"
	| "ALREADY_EXISTS"
	| "AUTHENTICATION_FAILED"
	| "INVALID_ARGUMENTS";

/*
 * Docker-related types
 */
export type ContainerActionResponse = BaseResponse<CommonCodes>;

export type ContainerStatusResponse = BaseResponse<CommonCodes> & {
	status: ApplicationState;
};

/*
 * Form-related types
 */
export type FormResponse = BaseResponse<CommonCodes>;
