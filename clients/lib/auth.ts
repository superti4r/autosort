import "dotenv/config";
import { PrismaClient } from "./prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET as string,
    database: prismaAdapter(prisma, {
        provider: "mysql"
    }),

    emailAndPassword: {
        enabled: true
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        },

        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }
    },

    plugins: [
        nextCookies()
    ]
});