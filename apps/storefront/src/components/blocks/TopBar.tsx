"use client";

import { useSiteConfig } from "@/config";
import type { Site } from "@/config/site-config";
import { useTranslation } from "@/i18n";
import Link from "next/link";

interface TopBarProps {
  infoStrip?: NonNullable<NonNullable<Site["header"]>["infoStrip"]>;
  topLinks?: NonNullable<NonNullable<Site["header"]>["topLinks"]>;
}

export function TopBar(props: TopBarProps) {
  const config = useSiteConfig();
  const { t } = useTranslation();
  
  const topLinks = props.topLinks || config?.header?.topLinks || [];

  return (
    <div className="topbar">
      <div className="container-theme flex items-center justify-between py-1">
        {/* Right side — green "all categories" button (RTL) */}
        <div className="flex items-center gap-3">
          <button className="topbar-cat-btn">
            <span>☰</span>
            <span>{t("nav.allCategories")}</span>
          </button>
        </div>

        {/* Center — page links */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="topbar-link">{t("common.home")}</Link>
          {topLinks.map((link, i) => (
            <span key={link.id || i} className="flex items-center gap-1">
              <span className="text-gray-300 text-[10px]">|</span>
              <Link href={link.href || "#"} className="topbar-link">
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Left side — auth links */}
        <div className="flex items-center gap-2">
          <Link href="/register" className="topbar-link">{t("common.register")}</Link>
          <span className="text-gray-300 text-[10px]">|</span>
          <Link href="/login" className="topbar-link">{t("common.login")}</Link>
        </div>
      </div>
    </div>
  );
}
