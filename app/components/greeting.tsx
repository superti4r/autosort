import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Greeting() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Hello World – halaman ini hanya bisa diakses setelah login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Kamu sudah berhasil melewati autentikasi Better Auth. Ini contoh
            sederhana integrasi Better Auth UI, shadcn, dan Next.js App Router.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button asChild variant="outline">
            <a href="/account/settings">Account</a>
          </Button>
          <Button asChild>
            <a href="/auth/sign-out">Sign out</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
