import { atom } from "jotai";

export const authenticationFormSelectedTabAtom = atom<"login" | "register">(
	"login",
);
