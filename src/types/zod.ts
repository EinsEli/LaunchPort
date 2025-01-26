import { z } from "zod";

export const zodEmailObject = z.string().trim().min(1).max(255).email({
	message: "Please enter a valid email address.",
});

export const zodPasswordObject = z.string().min(8).max(255);
