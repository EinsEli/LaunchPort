/*
 * AUTHENTICATION
 * -----------------
 * This file is responsible for setting up the authentication providers in Auth.js
 * and exporting the handlers and auth functions for use in the API routes.
 */
import Credentials from "next-auth/providers/credentials";
import Passkey from "next-auth/providers/passkey";
import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import hashString from "@/lib/hash";

export class InvalidCredentialsError extends CredentialsSignin {
	code = "InvalidCredentialsError";
}

export class UserNotFoundError extends CredentialsSignin {
	code = "UserNotFoundError";
}

export class NoPasswordSetError extends CredentialsSignin {
	code = "NoPasswordSetError";
}

const authOptions: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	experimental: { enableWebAuthn: true }, // Enable Passkeys
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				const { email, password } = credentials;
				if (!email || !password) return null;

				const user = await prisma.user.findUnique({
					where: { email: email as string },
				});

				if (!user) {
					throw new UserNotFoundError();
				}

				const hash = hashString(password as string);
				if (user.password !== hash) {
					throw new InvalidCredentialsError();
				}
				return user ?? null;
			},
		}),
		Passkey,
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth",
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.sub) {
				const user = await prisma.user.findUnique({
					where: { id: token.sub },
				});
				if (user) {
					delete (user as { password?: string }).password;
					session.user = user;
				}
			}
			return session;
		},
	},
};

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth(authOptions);
