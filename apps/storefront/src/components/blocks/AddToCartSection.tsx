"use client";

import { useTranslation } from "@/i18n";
import { useState } from "react";

interface AddToCartSectionProps {
  basePrice: number;
  salePrice?: number | null;
  upgradesPrice: number;
  inStock?: boolean | null;
}

export function AddToCartSection({ basePrice, salePrice, upgradesPrice, inStock = true }: AddToCartSectionProps) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const effectivePrice = salePrice || basePrice;
  const singleItemPrice = effectivePrice + upgradesPrice;
  const totalPrice = singleItemPrice * quantity;

  return (
    <div className="add-to-cart-section space-y-4 p-4 border border-border rounded-lg bg-card">
      
      {/* Total Price Display */}
      <div className="flex justify-between items-center mb-6">
          <span className="text-muted-foreground font-medium">{t("product.total") || "Total:"}</span>
          <span className="text-2xl font-bold">{t("common.currency")}{totalPrice.toLocaleString()}</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-border rounded-md bg-background">
          <button 
            type="button"
            className="px-4 py-2 text-foreground hover:bg-muted transition-colors rounded-l-md"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={!inStock}
          >
            -
          </button>
          <span className="px-4 py-2 w-16 text-center font-medium border-x border-border">
            {quantity}
          </span>
          <button 
            type="button"
            className="px-4 py-2 text-foreground hover:bg-muted transition-colors rounded-r-md"
            onClick={() => setQuantity(q => q + 1)}
            disabled={!inStock}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          disabled={!inStock}
        >
          {inStock ? (t("product.addToCart") || "Add to Cart") : (t("product.outOfStock") || "Out of Stock")}
        </button>
      </div>

       {upgradesPrice > 0 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            {t("product.includesUpgrades") || "Includes upgrades:"} {t("common.currency")}{(upgradesPrice * quantity).toLocaleString()}
          </p>
      )}
    </div>
  );
}
