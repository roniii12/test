"use client";

import { useTranslation } from "@/i18n";
import { useSiteConfig } from "@/config";
import { Breadcrumb } from "@/components/blocks/Breadcrumb";

/**
 * Contact page — pixel-matches mygan.co.il/contact
 * Contact form + sidebar with business info from SiteConfig
 */
export default function ContactPage() {
  const { t } = useTranslation();
  const config = useSiteConfig();

  const breadcrumbs = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("contact.title"), href: "/contact" },
  ];

  return (
    <div className="contact-page">
      <div className="container-theme pt-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="container-theme section-padding">
        <div className="section-header-bar">
          <h1 className="text-lg font-extrabold">{t("contact.title")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="contact-label">{t("contact.name")}</label>
                  <input
                    type="text"
                    className="contact-input"
                    placeholder={t("contact.name")}
                    required
                  />
                </div>
                <div>
                  <label className="contact-label">{t("contact.phone")}</label>
                  <input
                    type="tel"
                    className="contact-input"
                    placeholder={t("contact.phone")}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="contact-label">{t("contact.email")}</label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder={t("contact.email")}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="contact-label">{t("contact.subject")}</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder={t("contact.subject")}
                />
              </div>

              <div className="mb-6">
                <label className="contact-label">{t("contact.message")}</label>
                <textarea
                  className="contact-input contact-textarea"
                  placeholder={t("contact.message")}
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                {t("contact.send")}
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="contact-sidebar">
            <div className="contact-card">
              <h3 className="contact-card-title">📞 {t("contact.callUs")}</h3>
              <a href={`tel:${config?.contact?.phone?.replace(/-/g, "") || ""}`} className="contact-card-value text-primary font-bold">
                {config?.contact?.phone}
              </a>
            </div>

            <div className="contact-card">
              <h3 className="contact-card-title">✉️ {t("contact.writeUs")}</h3>
              <a href={`mailto:${config?.contact?.email || ""}`} className="contact-card-value text-primary">
                {config?.contact?.email}
              </a>
            </div>

            {config?.contact?.address && (
              <div className="contact-card">
                <h3 className="contact-card-title">📍 {t("contact.address")}</h3>
                <p className="contact-card-value">{config.contact.address}</p>
              </div>
            )}

            {config?.contact?.hours && (
              <div className="contact-card">
                <h3 className="contact-card-title">🕐 {t("contact.hours")}</h3>
                <p className="contact-card-value text-xs">{config.contact.hours.weekdays}</p>
                <p className="contact-card-value text-xs">{config.contact.hours.friday}</p>
                {config.contact.hours.notes && (
                  <p className="contact-card-value text-xs mt-1 text-muted-foreground italic">{config.contact.hours.notes}</p>
                )}
              </div>
            )}

            <div className="contact-note">
              <p className="text-xs text-muted-foreground">{t("contact.coordinator")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
