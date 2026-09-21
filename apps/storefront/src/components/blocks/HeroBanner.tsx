"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import type { HeroSlide, HeroSideBanner } from "@/config";

interface HeroBannerProps {
  slides: HeroSlide[];
  sideBanners?: HeroSideBanner[];
  autoPlayMs?: number;
  customClasses?: string;
}

export function HeroBanner({ slides, sideBanners, autoPlayMs = 5000, customClasses }: HeroBannerProps) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(next, autoPlayMs);
    return () => clearInterval(interval);
  }, [next, autoPlayMs]);

  const slide = slides[current];

  return (
    <section className={cn("hero-grid-section", customClasses)}>
      <div className="hero-grid">
        {/* Main slider — right side (RTL), takes 60% */}
        <div className="hero-main-slider">
          <div
            className={`hero-slide bg-gradient-to-br ${slide.bgGradient}`}
            style={slide.image ? { backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            {/* Dark overlay for text readability */}
            {slide.image && <div className="absolute inset-0 bg-black/30" />}

            <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col justify-center h-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight max-w-lg drop-shadow-md">
                {slide.headline}
              </h2>
              {slide.subheadline && (
                <p className="text-base sm:text-lg text-white/90 mb-8 max-w-md leading-relaxed drop-shadow-sm">
                  {slide.subheadline}
                </p>
              )}
              <Link href={slide.ctaHref} className="hero-cta self-start">
                <span>«</span>
                <span>{slide.cta}</span>
              </Link>
            </div>
          </div>

          {/* Dots */}
          {slides.length > 1 && (
            <div className="hero-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`hero-dot ${idx === current ? "hero-dot-active" : ""}`}
                  aria-label={`${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Side banners — left side (RTL), 2 stacked */}
        {sideBanners && sideBanners.length > 0 && (
          <div className="hero-side-banners">
            {sideBanners.slice(0, 2).map((banner, idx) => (
              <Link
                key={idx}
                href={banner.ctaHref}
                className={`hero-side-banner bg-gradient-to-br ${banner.bgGradient}`}
                style={banner.image ? { backgroundImage: `url(${banner.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              >
                {banner.image && <div className="absolute inset-0 bg-black/30" />}
                <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end h-full">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 leading-tight drop-shadow-sm">
                    {banner.headline}
                  </h3>
                  <span className="hero-cta-sm self-start">
                    <span>«</span>
                    <span>{banner.cta}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
