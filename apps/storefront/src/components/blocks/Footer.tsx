"use client";

import Link from "next/link";
import { useSiteConfig } from "@/config";
import type { Site, SiteContact, SocialLink } from "@/config/site-config";
import { useTranslation } from "@/i18n";

interface FooterProps {
  config?: Site["footer"];
  contact?: SiteContact;
  social?: SocialLink[];
}

export function Footer(props: FooterProps) {
  const contextConfig = useSiteConfig();
  const { t } = useTranslation();

  const config = {
    ...contextConfig,
    footer: props.config || contextConfig?.footer,
    contact: props.contact || contextConfig?.contact,
    social: props.social || contextConfig?.social || [],
  };

  return (
    <footer className="site-footer">
      {/* Main footer */}
      <div className="container-theme py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sitemap columns from config */}
          {config.footer?.columns?.map((col) => (
            <div key={col.id || col.title}>
              <h3 className="footer-heading">{col.title}</h3>
              <ul className="space-y-2">
                {col.links?.map((link) => (
                  <li key={link.id || link.label}>
                    <Link href={link.href || "#"} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact / Hours */}
          <div>
            <h3 className="footer-heading">{t("footer.hours")}</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${config.contact?.phone?.replace(/-/g, "") || ""}`} className="hover:text-primary transition-colors">
                  {config.contact?.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${config.contact?.email}`} className="hover:text-primary transition-colors">
                  {config.contact?.email}
                </a>
              </li>
              <li className="flex gap-2">
                <span>🕐</span>
                <div>
                  <div>{config.contact?.hours?.weekdays}</div>
                  <div>{config.contact?.hours?.friday}</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>{config.contact?.address}</span>
              </li>
            </ul>
            {config.contact?.hours?.notes && (
              <p className="text-[10px] text-gray-400 mt-2">{config.contact.hours.notes}</p>
            )}
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-heading">{t("footer.newsletter")}</h3>
            <p className="text-xs text-gray-500 mb-3">{t("footer.newsletterDesc")}</p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                className="footer-email-input"
              />
              <button className="footer-email-btn cursor-pointer">{t("footer.send")}</button>
            </div>
          </div>

          {/* Social + Brand */}
          <div>
            <h3 className="footer-heading">{t("footer.visitUs")}</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="logo-box w-8 h-8 text-sm">
                <span className="text-white font-black">{config.brand?.logoText}</span>
              </div>
              <div>
                <div className="text-sm font-black text-gray-800">{config.brand?.name}</div>
                <div className="text-[9px] text-gray-400">{config.brand?.tagline}</div>
              </div>
            </div>
            <div className="flex gap-2">
              {config.social.map((s) => (
                <a
                  key={s.id || s.type}
                  href={s.url || "#"}
                  className="footer-social-icon"
                  aria-label={s.label || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.type === "facebook" && "f"}
                  {s.type === "youtube" && "▶"}
                  {s.type === "whatsapp" && "💬"}
                  {s.type === "instagram" && "📷"}
                  {s.type === "tiktok" && "♪"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-300">
        <div className="container-theme py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-400">
          <span>{config.footer?.copyrightText}</span>
          <span>{config.footer?.bottomNote}</span>
        </div>
      </div>
    </footer>
  );
}
