"use client";

import { useTranslation } from "@/i18n";
import { useState } from "react";
// Would ideally import Payload's Lexical renderer, putting simple stub for now
// import { RichText } from "@payloadcms/richtext-lexical/react";

interface ProductDescriptionProps {
  content?: any;
}

export function ProductDescription({ content }: ProductDescriptionProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("description"); // description | warranty | delivery | assembly

  if (!content) {
    return null;
  }

  return (
    <div className="product-description my-12">
      {/* Tabs / Headers */}
      <div className="flex border-b border-border overflow-x-auto gap-1">
          <button 
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === "description" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              onClick={() => setActiveTab("description")}
          >
              {t("product.description") || "Product Description"}
          </button>
          
          <button 
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === "warranty" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              onClick={() => setActiveTab("warranty")}
          >
              {t("product.warrantyTab") || "Warranty"}
          </button>
          
          <button 
              className={`px-6 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === "delivery" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              onClick={() => setActiveTab("delivery")}
          >
              {t("product.deliveryTab") || "Delivery Policy"}
          </button>
      </div>

       {/* Tab Content */}
      <div className="py-8 min-h-[300px] prose prose-sm md:prose-base max-w-none prose-a:text-primary hover:prose-a:text-primary/80">
          {activeTab === "description" && (
             <div>
                {/* Fallback rendering logic until full payload lexical is hooked up */}
                {typeof content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p>Rich text content... (Needs @payloadcms/richtext-lexical/react)</p>
                )}
             </div>
          )}

          {activeTab === "warranty" && (
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                  <h4 className="font-bold text-lg mb-4">{t("product.warrantyPlaceholder") || "Warranty details to be populated from payload site globals"}</h4>
              </div>
          )}

           {activeTab === "delivery" && (
              <div className="bg-muted/30 p-6 rounded-lg border border-border">
                  <h4 className="font-bold text-lg mb-4">{t("product.deliveryPlaceholder") || "Delivery details to be populated from payload site globals"}</h4>
              </div>
          )}
      </div>
    </div>
  );
}
