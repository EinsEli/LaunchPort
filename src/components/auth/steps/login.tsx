/*
 * LOGIN STEP
 * -----------------
 * This is the login step of the authentication form.
 */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { signIn as signInWebAuthn } from "next-auth/webauthn";
import { TbLoader } from "react-icons/tb";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import { authenticationFormSelectedTabAtom } from "@/atoms/auth";
import { redirect, useSearchParams } from "next/navigation";
import { GoPasskeyFill } from "react-icons/go";
import { toast } from "sonner";

const loginSchema = z.object({
	email: z.string().trim().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(1, {
		message: "Please enter your password.",
	}),
});

export default function Login() {
	const setSelectedTab = useSetAtom(authenticationFormSelectedTabAtom);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const redirectUrl = useSearchParams().get("rd") || "/";

	async function onSubmit(data: z.infer<typeof loginSchema>) {
		const { setError } = form;
		setIsLoading(true);

		const signInResult = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (signInResult?.error) {
			if (signInResult.code === "InvalidCredentialsError") {
				setError("password", {
					type: "manual",
					message: "Invalid email or password.",
				});
			} else if (signInResult.code === "UserNotFoundError") {
				setError("email", {
					type: "manual",
					message: "User with the specified email does not exist.",
				});
			}
		} else {
			return redirect(redirectUrl);
		}
		setIsLoading(false);
	}

	async function handlePasskeySignIn() {
		let signInResult;
		try {
			signInResult = await signInWebAuthn("passkey", {
				redirect: false,
			});
		} catch {
			toast.error(
				"Error while signing in with Passkey. Please try again.",
			);
		}

		if (signInResult?.ok) {
			return redirect(redirectUrl);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h1 className="text-3xl font-semibold">Welcome back! 👋</h1>
					<p className="text-base font-medium text-muted-foreground">
						Sign in to your existing LaunchPort account.
					</p>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-6">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="mt-2 grid gap-2"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="email">
											Email
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="user@example.com"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="password">
											Password
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Password"
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="mt-2 w-full"
								disabled={isLoading}
							>
								<TbLoader
									className={`mr-2 h-4 w-4 animate-spin ${isLoading ? "block" : "hidden"}`}
								/>
								{isLoading ? "Signing in..." : "Login"}
							</Button>
							<div
								className="group my-2 flex flex-row gap-1 text-sm text-muted-foreground"
								onClick={() => setSelectedTab("register")}
							>
								Don&apos;t have an account?
								<div className="font-semibold group-hover:underline">
									Register
								</div>
							</div>
						</form>
					</Form>
					<Separator />
					<div className="grid gap-4">
						<Button
							variant="outline"
							className="w-full"
							onClick={() => handlePasskeySignIn()}
						>
							<GoPasskeyFill className="mr-2" size={16} />
							Sign in with Passkey
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
