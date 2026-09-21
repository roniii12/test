"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/config";

interface ProductGridProps {
  title: string;
  showAllLabel?: string;
  products: Product[];
  columns?: number;
  customClasses?: string;
}

export function ProductGrid({ title, products, customClasses }: ProductGridProps) {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // RTL: scrollLeft is negative in some browsers
    const scrollPos = Math.abs(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(scrollPos > 4);
    setCanNext(scrollPos < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Card width + gap, scroll by 1 card
    const card = el.querySelector<HTMLElement>(".product-card");
    const cardWidth = card ? card.offsetWidth + 16 : 280;
    // In RTL, scrolling "next" (left arrow visually) means scrolling LEFT (negative)
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section className={cn("section-padding bg-white", customClasses)}>
      <div className="container-theme">
        {/* Title */}
        <h2 className="carousel-title">{title}</h2>

        {/* Carousel wrapper */}
        <div className="carousel-wrap">
          {/* Prev arrow (right side in RTL) */}
          {canPrev && (
            <button
              className="carousel-arrow carousel-arrow-prev"
              onClick={() => scroll(-1)}
              aria-label={t("carousel.prev")}
            >
              ❯
            </button>
          )}

          {/* Track */}
          <div ref={trackRef} className="carousel-track">
            {products.map((product) => (
              <div key={product.id} className="carousel-slide"> 
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Next arrow (left side in RTL) */}
          {canNext && (
            <button
              className="carousel-arrow carousel-arrow-next"
              onClick={() => scroll(1)}
              aria-label={t("carousel.next")}
            >
              ❮
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
