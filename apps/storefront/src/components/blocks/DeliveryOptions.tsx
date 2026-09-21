"use client";

import { useTranslation } from "@/i18n";
import { useState } from "react";

export interface DeliveryOption {
  label: string;
  price: number;
}

interface DeliveryOptionsProps {
  options?: DeliveryOption[] | null;
}

export function DeliveryOptions({ options }: DeliveryOptionsProps) {
  const { t } = useTranslation();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="delivery-options mt-8 border border-border rounded-lg p-5">
      <h4 className="font-semibold text-base mb-4">{t("product.deliveryOptions") || "Delivery Options"}</h4>
      
      <div className="space-y-3">
        {options.map((option, idx) => (
          <label 
            key={idx} 
            className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${selectedIdx === idx ? "border-primary bg-primary/5" : "border-transparent hover:bg-muted"}`}
          >
            <div className="flex items-center h-5">
              <input 
                type="radio" 
                name="deliveryOption" 
                className="h-4 w-4 text-primary bg-background border-border focus:ring-primary"
                checked={selectedIdx === idx}
                onChange={() => setSelectedIdx(idx)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </div>
            <div className="text-sm font-bold whitespace-nowrap">
                {option.price === 0 ? (t("product.free") || "Free") : `${t("common.currency")}${option.price.toLocaleString()}`}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
