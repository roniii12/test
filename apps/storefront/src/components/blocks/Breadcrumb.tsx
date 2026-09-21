"use client";

import type { BreadcrumbItem } from "@/config";
import { useTranslation } from "@/i18n";

/**
 * Breadcrumb — pixel-match Konimbo CMS pattern
 * Home > Category > Sub-Category
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useTranslation();
  
  const getLabel = (label: string) => {
    if (label.toLowerCase() === "home" || label === "דף הבית") {
      return t("common.home");
    }
    return label;
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="flex items-center gap-1 flex-wrap text-xs text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-muted-foreground/50">‹</span>}
            {i === items.length - 1 ? (
              <span className="text-foreground font-medium">{getLabel(item.label)}</span>
            ) : (
              <a href={item.href} className="hover:text-primary transition-colors">
                {getLabel(item.label)}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
