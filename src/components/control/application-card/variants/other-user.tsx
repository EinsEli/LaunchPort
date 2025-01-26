/*
 * PRIVATE APPLICATION CARD
 * -----------------
 * The card for private applications (application is private and user is not logged in)
 */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignOutButton from "../sign-out-button";

export default function OtherUserApplicationCard() {
	return (
		<Card className="min-w-96 overflow-hidden py-4">
			<CardHeader className="flex items-center justify-center gap-6">
				<CardTitle className="flex flex-col items-center justify-center gap-2">
					<h1 className="line-clamp-2 w-fit max-w-60 text-center">
						Other user 👤
					</h1>
					<p className="w-80 text-balance text-center text-base font-medium text-muted-foreground">
						This application belongs to another user. Switch users
						to access it.
					</p>
				</CardTitle>
				<Separator className="my-2" />
			</CardHeader>
			<CardContent className="flex flex-row gap-2">
				<SignOutButton>Switch users</SignOutButton>
			</CardContent>
		</Card>
	);
}
