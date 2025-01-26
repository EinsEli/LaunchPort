/*
 * HASH UTILS
 * ----------
 * Utility functions for hashing strings.
 * Used for hashing passwords.
 */
import { SHA256 as sha256 } from "crypto-js";

export default function hashString(input: string): string {
	return sha256(input).toString();
}
