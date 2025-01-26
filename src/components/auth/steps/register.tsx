/*
 * REGISTER STEP
 * -----------------
 * This is the register step of the authentication form.
 */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TbLoader } from "react-icons/tb";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSetAtom } from "jotai";
import { authenticationFormSelectedTabAtom } from "@/atoms/auth";
import { registerUser } from "@/app/(server)/actions/register";
import { toast } from "sonner";

const registerSchema = z
	.object({
		email: z.string().trim().email({
			message: "Please enter a valid email address.",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters long.",
		}),
		name: z.string().min(2, {
			message: "Please enter your name.",
		}),
		confirmPassword: z.string().min(6, {
			message: "Please confirm your password.",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

export default function Register() {
	const setSelectedTab = useSetAtom(authenticationFormSelectedTabAtom);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof registerSchema>) {
		const { setError } = form;
		setIsLoading(true);

		if (data.password !== data.confirmPassword) {
			setError("confirmPassword", {
				type: "manual",
				message: "Passwords do not match (2).",
			});
			return;
		}

		registerUser(data).then((response) => {
			if (response.code === "SUCCESS") {
				toast.success("Account created successfully. Please login.");
				setSelectedTab("login");
			} else if (response.code === "ALREADY_EXISTS") {
				setError("email", {
					type: "manual",
					message: "User with the same email already exists.",
				});
			} else {
				toast.error(`Failed to create account: ${response.message}`);
			}
		});

		setIsLoading(false);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h1 className="text-3xl font-semibold">
						Create an account 🔑
					</h1>
					<p className="text-base font-medium text-muted-foreground">
						Sign up for a new LaunchPort account.
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="email">
											Display Name
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="John Doe"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="confirmPassword">
											Confirm Password
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Confirm Password"
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
								{isLoading ? "Registering..." : "Register"}
							</Button>
							<div
								className="group my-2 flex flex-row gap-1 text-sm text-muted-foreground"
								onClick={() => setSelectedTab("login")}
							>
								Already have an account?
								<div className="font-semibold group-hover:underline">
									Login
								</div>
							</div>
						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
}
