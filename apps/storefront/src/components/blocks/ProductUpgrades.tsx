"use client";

import { useTranslation } from "@/i18n";
import { useState, useEffect } from "react";

export interface UpgradeOption {
  label: string;
  priceAdd: number;
}

export interface UpgradeCategory {
  name: string;
  options: UpgradeOption[];
}

interface ProductUpgradesProps {
  upgrades?: UpgradeCategory[] | null;
  onUpgradesChange: (totalUpgradePrice: number) => void;
}

export function ProductUpgrades({ upgrades, onUpgradesChange }: ProductUpgradesProps) {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  useEffect(() => {
    // Calculate total upgrade price
    const total = Object.values(selectedOptions).reduce((sum, price) => sum + price, 0);
    onUpgradesChange(total);
  }, [selectedOptions, onUpgradesChange]);

  if (!upgrades || upgrades.length === 0) {
    return null;
  }

  const handleOptionChange = (categoryName: string, optionPrice: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryName]: optionPrice
    }));
  };

  return (
    <div className="product-upgrades space-y-4 mb-8">
      <h3 className="font-semibold text-lg">{t("product.upgradesTitle") || "Upgrades & Add-ons"}</h3>
      
      {upgrades.map((category, idx) => {
        // Find if this category has been disabled by looking at the options
        if (!category.options || category.options.length === 0) return null;

        return (
          <div key={idx} className="upgrade-group">
            <label className="block text-sm font-medium text-foreground mb-1">
              {category.name}
            </label>
            <select
              className="w-full p-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              onChange={(e) => {
                  const price = parseFloat(e.target.value);
                  handleOptionChange(category.name, price);
              }}
              defaultValue="0"
            >
              <option value="0">{t("product.none") || "None"}</option>
              {category.options.map((opt, optIdx) => (
                <option key={optIdx} value={opt.priceAdd}>
                  {opt.label} {opt.priceAdd > 0 ? `(+${t("common.currency")}${opt.priceAdd})` : ""}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
