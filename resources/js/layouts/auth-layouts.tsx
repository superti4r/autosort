import { Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { AuthMedia, type AuthMediaSlide } from '../components/auth-media';
import { cn } from '../lib/utils';

type AuthLayoutProps = PropsWithChildren<{
    title: string;
    subtitle?: string;
    description?: string;
    brand?: string;
    backTo?: {
        label: string;
        href: string;
    };
    footer?: ReactNode;
    meta?: ReactNode;
    className?: string;
    slides?: AuthMediaSlide[];
    carouselInterval?: number;
}>;

export function AuthLayout({
    title,
    subtitle,
    description,
    brand = 'Autosort',
    backTo,
    footer,
    meta,
    className,
    slides,
    carouselInterval,
    children,
}: AuthLayoutProps) {
    const hasSlides = Boolean(slides?.length);

    return (
        <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background text-foreground">
            <div className="bg-[radial-gradient(circle_at_top,_theme(colors.primary/15),_transparent_55%),radial-gradient(circle_at_bottom,_theme(colors.primary/12),_transparent_55%)] pointer-events-none absolute inset-0" />
            <div className="relative flex flex-1 flex-col md:flex-row">
                {hasSlides ? (
                    <aside className="relative hidden overflow-hidden md:flex md:flex-[1.2]">
                        <AuthMedia
                            slides={slides ?? []}
                            interval={carouselInterval}
                            frame={false}
                            className="h-full w-full rounded-none md:rounded-r-[3.75rem]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(0,0,0,0.35),_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(0,0,0,0.25),_transparent_55%)] mix-blend-overlay" />
                        <div className="absolute inset-x-12 top-12 flex items-center justify-between text-sm font-medium text-white/80 drop-shadow-[0_10px_32px_rgba(0,0,0,0.35)]">
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-white/90">
                                <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur">
                                    <Sparkles className="size-4" />
                                </span>
                                {brand}
                            </Link>
                            {backTo ? (
                                <Link href={backTo.href} className="inline-flex items-center gap-1 text-white/70 transition hover:text-white">
                                    <ArrowLeft className="size-4" />
                                    {backTo.label}
                                </Link>
                            ) : null}
                        </div>
                    </aside>
                ) : null}

                <main className={cn('flex flex-1 items-center justify-center px-6 py-12 sm:px-12 md:px-14 lg:px-20', className)}>
                    <div className="mx-auto flex w-full max-w-md flex-col gap-10">
                        <div className="flex flex-col gap-6 md:hidden">
                            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                                >
                                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm backdrop-blur">
                                        <Sparkles className="size-4" />
                                    </span>
                                    {brand}
                                </Link>
                                {backTo ? (
                                    <Link
                                        href={backTo.href}
                                        className="inline-flex items-center gap-1 text-muted-foreground transition hover:text-foreground"
                                    >
                                        <ArrowLeft className="size-4" />
                                        {backTo.label}
                                    </Link>
                                ) : null}
                            </div>
                            {hasSlides ? (
                                <AuthMedia slides={slides ?? []} interval={carouselInterval} className="h-56 w-full rounded-[3rem]" />
                            ) : null}
                        </div>

                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-[2.2rem] sm:leading-[1.1]">{title}</h2>
                            {subtitle ? <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p> : null}
                            {description ? <p className="text-sm text-muted-foreground/90 sm:text-base">{description}</p> : null}
                        </div>

                        {children}

                        {footer ? <div className="text-center text-sm text-muted-foreground md:text-left">{footer}</div> : null}
                        {meta ? <div>{meta}</div> : null}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AuthLayout;
