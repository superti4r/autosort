"use client";

import * as React from "react";
import {
  AccountSettingsCards,
  DeleteAccountCard,
  SecuritySettingsCards,
} from "@daveyplate/better-auth-ui";

export default function AccountPage() {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <div>
        <h2 className="text-sm font-medium tracking-tight">Profil Akun</h2>
        <p className="text-xs text-muted-foreground">
          Kelola informasi profil, kredensial, dan pengaturan akun kamu.
        </p>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <AccountSettingsCards />
      </div>
      <div className="mx-auto w-full max-w-3xl">
        <SecuritySettingsCards />
      </div>
      <div className="mx-auto w-full max-w-3xl">
        <DeleteAccountCard />
      </div>
    </section>
  );
}
