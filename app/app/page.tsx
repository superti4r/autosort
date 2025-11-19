"use client";

import {
  useAuthenticate,
  RedirectToSignIn,
  AuthLoading,
  SignedIn,
} from "@daveyplate/better-auth-ui";
import { SkeletonLoading } from "@/components/skeleton-loading";
import Greeting from "@/components/greeting";

export default function DashboardPage() {
  useAuthenticate();

  return (
    <>
      <AuthLoading>
        <SkeletonLoading />
      </AuthLoading>

      <RedirectToSignIn />

      <SignedIn>
        <Greeting />
      </SignedIn>
    </>
  );
}
