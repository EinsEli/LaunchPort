import { Application } from "@prisma/client";
import { atom } from "jotai";

export const applicationsSelectedApplication = atom<Application>();

export const applicationsAddDialogOpenAtom = atom(false);

export const applicationsDeleteDialogOpenAtom = atom(false);
