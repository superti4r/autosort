import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import slide1 from '@/layouts/auth/slide1.jpg';
import slide2 from '@/layouts/auth/slide2.jpg';
import slide3 from '@/layouts/auth/slide3.jpg';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    const slides = [slide1, slide2, slide3];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col overflow-hidden text-white lg:flex dark:border-r">
                {slides.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Slide ${i + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                            i === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}

                <div className="absolute inset-0 bg-black/60" />

                <Link
                    href={home()}
                    className="relative z-20 flex items-center p-10 text-lg font-medium"
                >
                    {name}
                </Link>

                {quote && (
                    <div className="relative z-20 mt-auto p-10">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;{quote.message}&rdquo;
                            </p>
                            <footer className="text-sm text-neutral-300">
                                {quote.author}
                            </footer>
                        </blockquote>
                    </div>
                )}
            </div>

            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    />
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
