import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

const allowedAuthPaths = [
  authViewPaths.CALLBACK,
  authViewPaths.RECOVER_ACCOUNT,
  authViewPaths.SIGN_IN,
  authViewPaths.SIGN_OUT,
  authViewPaths.TWO_FACTOR,
  authViewPaths.ACCEPT_INVITATION,
] as const;

export function generateStaticParams() {
  return allowedAuthPaths.map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="container flex min-h-screen items-center justify-center p-4 md:p-6">
      <div className="grid w-full gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] items-stretch">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-xl bg-card text-card-foreground border border-border shadow-xl p-6 md:p-7">
            <div className="mb-4 space-y-1">
              <h1 className="text-lg font-semibold">Selamat datang kembali</h1>
              <p className="text-xs text-muted-foreground">
                Masuk untuk mengakses dashboard dan semua fitur sistem.
              </p>
            </div>
            <AuthView
              path={path}
            />
          </div>
        </div>

        <div className="relative hidden md:flex rounded-xl overflow-hidden bg-background border border-border">
          <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0,_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.04)_0,_transparent_55%)]" />
          <div className="relative z-10 flex flex-col justify-between p-8 lg:p-10 text-foreground">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                AutoSort &mdash; Sistem Sortir Jamur IoT
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold leading-snug">
                Selamat datang di sistem pemantauan{" "}
                <span className="underline decoration-primary/60 underline-offset-4">
                  Jamur Merang
                </span>
                .
              </h2>
            </div>

            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-lg border border-border/60 bg-card/20 p-3">
                <p className="text-xs text-muted-foreground">Pantau</p>
                <p className="text-sm font-medium">
                  Menggunakan kamera
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/20 p-3">
                <p className="text-xs text-muted-foreground">Data</p>
                <p className="text-sm font-medium">Realtime</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-card/20 p-3">
                <p className="text-xs text-muted-foreground">UI/UX</p>
                <p className="text-sm font-medium">
                  Nyaman di desktop & mobile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
