"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CategoryItem } from "@/config";

interface CategoryBannersProps {
  title?: string;
  categories: CategoryItem[];
  columns?: number;
  customClasses?: string;
}

/**
 * Category banners matching mygan.co.il design:
 * - 3 columns × 2 rows grid of rectangular cards
 * - Full-bleed background photos (or gradient fallback)
 * - White title bar at the bottom with green accent tab
 * - Bold black text centered in the white bar
 */
export function CategoryBanners({ title, categories, customClasses }: CategoryBannersProps) {
  return (
    <section className={cn("section-padding bg-white", customClasses)}>
      <div className="container-theme">
        {title && (
          <h2 className="section-title">{title}</h2>
        )}
        <div className="cat-grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href} className="cat-card group">
              {/* Background: photo or gradient fallback */}
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="cat-card-img"
                />
              ) : (
                <div className={`cat-card-gradient bg-gradient-to-br ${cat.bgGradient || "from-gray-700 to-gray-500"}`}>
                  <span className="cat-card-icon">{cat.icon}</span>
                </div>
              )}

              {/* White title bar at the bottom */}
              <div className="cat-card-title-bar">
                <span className="cat-card-accent" />
                <h3 className="cat-card-name">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
