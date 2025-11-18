import Image from "next/image";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full items-center justify-center py-16 px-4 sm:px-8">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </div>
            <CardTitle className="text-3xl leading-10 tracking-tight">
              To get started, edit the page.tsx file.
            </CardTitle>
            <CardDescription className="text-base">
              Looking for a starting point or more instructions? Head over to{" "}
              <Button asChild variant="link" className="px-1">
                <a
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Templates
                </a>
              </Button>{" "}
              or the{" "}
              <Button asChild variant="link" className="px-1">
                <a
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learning
                </a>
              </Button>{" "}
              center.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="md:w-[158px]">
              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Deploy Now
              </a>
            </Button>
            <Button asChild variant="outline" className="md:w-[158px]">
              <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
