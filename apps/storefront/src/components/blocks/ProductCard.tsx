"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n";
import type { Product } from "@/config";

interface ProductCardProps {
  product: Product;
}

/**
 * Product card matching mygan.co.il's exact pattern:
 * Image → Title → Specs → Regular price (strikethrough) → Sale price → CTA link
 */
export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const hasDiscount = product.salePrice != null;
  
  return (
    <div className="product-card group">
      {/* Badge */}
      {product.badge && (
        <span className="product-badge">{product.badge}</span>
      )}

      {/* Product image area */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="product-image-area">
          <div className="text-7xl opacity-25 group-hover:scale-105 transition-transform duration-500">📦</div>
          {!product.inStock && (
            <div className="product-oos-overlay">
              <span className="product-oos-label">{t("product.outOfStock")}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="product-info">
        <Link href={`/products/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        {product.specs && Array.isArray(product.specs) && product.specs.length > 0 && (
          <p className="product-specs">
            {product.specs.map(spec => `${spec.key}: ${spec.value}`).join(", ")}
          </p>
        )}

        <div className="mt-auto">
          {/* Pricing */}
          <div className="product-pricing">
            {hasDiscount && (
              <div className="product-regular-price">
                {t("product.regularPrice")} {t("common.currency")}{product.price.toLocaleString()}
              </div>
            )}
            <div className="product-current-price">
              <span className="product-price-label">{t("product.price")}</span>
              <span className={`product-price-value ${hasDiscount ? "text-red-600" : ""}`}>
                {t("common.currency")}{(product.salePrice ?? product.price).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <Link href={`/products/${product.id}`} className="product-details-link">
              {t("product.details")}
            </Link>
            <button className="product-compare-btn cursor-pointer">
              {t("product.compare")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
