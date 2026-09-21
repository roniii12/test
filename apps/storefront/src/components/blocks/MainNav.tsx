"use client";

import { useState } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/config";
import type { Site, SiteBrand } from "@/config/site-config";
import { useTranslation } from "@/i18n";

interface MainNavProps {
  navigation?: NonNullable<NonNullable<Site["header"]>["navigation"]>;
  brand?: SiteBrand;
  infoStrip?: NonNullable<NonNullable<Site["header"]>["infoStrip"]>;
}

export function MainNav(props: MainNavProps) {
  const config = useSiteConfig();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigation = props.navigation || config?.header?.navigation || [];
  const brand = props.brand || config?.brand;
  const infoStrip = props.infoStrip || config?.header?.infoStrip || [];

  return (
    <header className="mainnav">
      {/* ── Row 1: Logo + Info + Search + Cart ── */}
      <div className="container-theme">
        <div className="flex items-center justify-between h-[80px] gap-4">
          {/* Logo — right side (RTL) */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="logo-box">
              <span className="text-white font-black text-xl">{brand?.logoText}</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-black leading-tight" style={{ color: '#6eb43f' }}>{brand?.name}</div>
              <div className="text-[10px] text-gray-400 leading-tight">{brand?.tagline}</div>
            </div>
          </Link>

          {/* Middle info section — tagline + phone */}
          <div className="hidden lg:flex flex-col items-center gap-0.5">
            <span className="text-xs text-gray-500">מוצרי גן ונוי ישירות לבית הלקוח</span>
            <a
              href={`tel:${config?.contact?.phone?.replace(/-/g, "") || ""}`}
              className="text-sm font-bold"
              style={{ color: '#6eb43f' }}
            >
              {t("nav.callUs")}
            </a>
          </div>

          {/* Info icons */}
          <div className="hidden lg:flex items-center gap-5">
            {infoStrip.map((item) => (
              <div key={item.text} className="nav-info-item">
                <span className="nav-info-icon">{item.icon}</span>
                <span className="nav-info-label">{item.text}</span>
              </div>
            ))}
            {/* Phone number */}
            <div className="nav-info-item">
              <span className="nav-info-icon">📞</span>
              <a href={`tel:${config?.contact?.phone?.replace(/-/g, "") || ""}`} className="nav-info-label font-semibold">
                {config?.contact?.phone}
              </a>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("common.search")}
                className="search-input"
              />
              <button className="search-btn cursor-pointer" aria-label="Search">
                🔍
              </button>
            </div>
          </div>

          {/* Cart + Hamburger */}
          <div className="flex items-center gap-1">
            <Link href="/cart" className="nav-icon-btn relative">
              🛒
              <span className="cart-badge">0</span>
            </Link>
            {/* Hamburger — mobile */}
            <button
              className="nav-icon-btn md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t("nav.menuToggle")}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Category nav bar ── */}
      <nav className="category-nav hidden md:block">
        <div className="container-theme">
          <ul className="flex items-center gap-0 overflow-x-auto">
            {navigation.map((item) => (
              <li
                key={item.label}
                className="relative shrink-0"
                onMouseEnter={() => setOpenDropdown(item.label || null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href || "#"}
                  className={`cat-nav-link ${item.highlight ? "text-red-600 font-bold" : ""}`}
                >
                  {item.label}
                  {item.children && <span className="ms-1 text-[10px] opacity-40">▼</span>}
                </Link>

                {item.children && openDropdown === item.label && (
                  <div className="dropdown-menu">
                    {item.children.map((child) => (
                      <Link key={child.id || child.label} href={child.href || "#"} className="dropdown-item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="p-3 border-b border-gray-200">
            <input type="text" placeholder={t("common.search")} className="search-input w-full" />
          </div>
          <ul>
            {navigation.map((item) => (
              <li key={item.label} className="border-b border-gray-100">
                <Link
                  href={item.href || "#"}
                  className={`block px-5 py-3 text-sm hover:bg-gray-50 ${item.highlight ? "text-red-600 font-bold" : "text-gray-700"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
