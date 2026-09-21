"use client";

import { useTranslation } from "@/i18n";

export interface SpecItem {
  key: string;
  value: string;
}

interface ProductSpecsProps {
  specs?: SpecItem[] | null;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const { t } = useTranslation();

  if (!specs || specs.length === 0) {
    return null;
  }

  return (
    <div className="product-specs my-10">
      <h3 className="section-title mb-6">
        <span className="section-header-bar">{t("product.specs") || "Technical Specifications"}</span>
      </h3>
      
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm text-end">
          <tbody>
            {specs.map((spec, idx) => (
              <tr 
                key={idx} 
                className={`border-b border-border last:border-0 ${idx % 2 === 0 ? "bg-muted/50" : "bg-background"}`}
              >
                <th 
                  scope="row" 
                  className="px-6 py-4 font-medium text-foreground whitespace-nowrap w-1/3 border-l border-border"
                >
                  {spec.key}
                </th>
                <td className="px-6 py-4 text-muted-foreground w-2/3">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
