"use client";

import { createAuthClient } from "better-auth/react";

const origin = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/$/, "");

const client = createAuthClient({
  baseURL: origin ? `${origin}/api/auth` : "/api/auth",
});

export const authClient = client;
export const { signIn, signUp, useSession } = client;
