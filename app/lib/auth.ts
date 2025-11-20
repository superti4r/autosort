import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

const appName = process.env.NEXT_PUBLIC_APP_NAME as string;
const baseURL = process.env.BETTER_AUTH_URL as string;
const secret = process.env.BETTER_AUTH_SECRET as string;

export const auth = betterAuth({
  appName,
  baseURL,
  secret,
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 14,
    updateAge: 60 * 60 * 6,
    freshAge: 60 * 15,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
