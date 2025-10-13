import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

export type AuthMediaSlide = {
    src: string;
    alt: string;
    title?: string;
    description?: string;
};

type AuthMediaProps = {
    slides: AuthMediaSlide[];
    interval?: number;
    className?: string;
    frame?: boolean;
};

const DEFAULT_INTERVAL = 5500;

export function AuthMedia({ slides, interval = DEFAULT_INTERVAL, className, frame = true }: AuthMediaProps) {
    const validSlides = useMemo(() => slides.filter(Boolean), [slides]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!validSlides.length) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % validSlides.length);
        }, interval);

        return () => {
            window.clearInterval(timer);
        };
    }, [validSlides, interval]);

    if (!validSlides.length) {
        return null;
    }

    return (
        <div
            className={clsx(
                'relative h-full w-full overflow-hidden',
                frame
                    ? 'rounded-3xl border border-border/40 bg-card/40 shadow-2xl shadow-primary/10 backdrop-blur-lg'
                    : 'backdrop-blur-0 rounded-none border-0 bg-transparent shadow-none',
                className,
            )}
        >
            <div className="absolute inset-0">
                {validSlides.map((slide, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <figure
                            key={`${slide.src}-${index}`}
                            className={clsx(
                                'absolute inset-0 flex flex-col justify-end bg-cover bg-center transition-opacity duration-700 ease-out',
                                isActive ? 'opacity-100' : 'opacity-0',
                            )}
                            style={{ backgroundImage: `url(${slide.src})` }}
                            role="img"
                            aria-label={slide.alt}
                            aria-hidden={!isActive}
                        >
                            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/65 via-background/35 to-transparent" />
                            {slide.title || slide.description ? (
                                <figcaption className="relative z-10 space-y-1.5 px-8 pb-10 text-foreground">
                                    {slide.title ? <p className="text-lg font-semibold tracking-tight">{slide.title}</p> : null}
                                    {slide.description ? <p className="max-w-xs text-sm text-muted-foreground">{slide.description}</p> : null}
                                </figcaption>
                            ) : (
                                <span className="sr-only">{slide.alt}</span>
                            )}
                        </figure>
                    );
                })}
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
                {validSlides.map((slide, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <span
                            key={`${slide.src}-dot-${index}`}
                            className={clsx(
                                'h-1.5 w-6 rounded-full bg-border transition-all duration-500 ease-out',
                                isActive && 'w-10 bg-primary/80',
                            )}
                            aria-label={`Tampilkan slide ${index + 1}`}
                            role="presentation"
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default AuthMedia;
