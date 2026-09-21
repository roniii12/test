"use client";

import { useTranslation } from "@/i18n";
import { Breadcrumb } from "@/components/blocks/Breadcrumb";

/**
 * Cart page — matches Konimbo CMS cart layout
 * Empty state for now (no backend) but fully i18n & config driven
 */
export default function CartPage() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("cart.title"), href: "/cart" },
  ];

  return (
    <div className="cart-page">
      <div className="container-theme pt-4">
        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="container-theme section-padding">
        <div className="section-header-bar">
          <h1 className="text-lg font-extrabold">{t("cart.title")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="cart-empty-state">
              <div className="cart-empty-icon">🛒</div>
              <h2 className="text-base font-bold mb-2">{t("cart.empty")}</h2>
              <p className="text-sm text-muted-foreground mb-6">{t("cart.emptyDesc")}</p>
              <a href="/" className="cart-continue-btn">
                {t("cart.continueShopping")}
              </a>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h3 className="text-sm font-bold mb-4 pb-3 border-b border-border">
              {t("cart.orderSummary")}
            </h3>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{t("cart.subtotal")}</span>
              <span className="font-bold">₪0</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">{t("cart.shipping")}</span>
              <span className="text-xs text-muted-foreground">{t("cart.shippingCalc")}</span>
            </div>

            <div className="flex justify-between text-sm pt-3 border-t border-border mb-6">
              <span className="font-bold">{t("cart.total")}</span>
              <span className="text-lg font-extrabold text-primary">₪0</span>
            </div>

            <button className="cart-checkout-btn" disabled>
              {t("cart.checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
