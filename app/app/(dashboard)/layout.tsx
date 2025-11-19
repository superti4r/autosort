"use client";

import * as React from "react";
import {
  useAuthenticate,
  RedirectToSignIn,
  AuthLoading,
  SignedIn,
} from "@daveyplate/better-auth-ui";

import { SkeletonLoading } from "@/components/skeleton-loading";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthenticate();

  return (
    <>
      <AuthLoading>
        <SkeletonLoading />
      </AuthLoading>

      <RedirectToSignIn />

      <SignedIn>
        <DashboardShell>{children}</DashboardShell>
      </SignedIn>
    </>
  );
}
