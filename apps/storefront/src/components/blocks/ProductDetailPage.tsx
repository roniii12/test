"use client";

import { Breadcrumb } from "./Breadcrumb";
import { ProductGallery } from "./ProductGallery";
import { ProductUpgrades } from "./ProductUpgrades";
import { AddToCartSection } from "./AddToCartSection";
import { DeliveryOptions } from "./DeliveryOptions";
import { ProductSpecs } from "./ProductSpecs";
import { ProductDescription } from "./ProductDescription";
import { ProductGrid } from "./ProductGrid";
import { useState } from "react";
import { useTranslation } from "@/i18n";

export function ProductDetailPage({ product }: { product: any }) {
  const { t } = useTranslation();
  const [upgradesPrice, setUpgradesPrice] = useState(0);

  const categoryTitle = product.category?.title || typeof product.category === 'string' ? product.category : "Category";

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: categoryTitle, href: `/category/${product.category?.slug || "all"}` },
    { label: product.name, href: `#` },
  ];

  return (
    <div className="product-detail-page bg-background text-foreground section-padding min-h-screen">
      <div className="container mx-auto">
        {/* Section 1: Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Right Column (RTL) / Left Column (LTR): Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 order-2 lg:order-1">
            <div className="product-header">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.sku && (
                <p className="text-sm text-muted-foreground mb-4">{t("product.sku")} {product.sku}</p>
              )}
            </div>

            <div className="product-price-block">
               {/* Pricing */}
              {product.salePrice ? (
                <div className="flex flex-col gap-1 mb-4">
                  <span className="text-lg line-through text-muted-foreground">
                    {t("common.currency")}{product.price?.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-red-600">
                      {t("common.currency")}{product.salePrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded font-medium">
                      {t("product.save")} {t("common.currency")}{(product.price - product.salePrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-4xl font-bold mb-4 flex items-center gap-4">
                  {t("common.currency")}{product.price?.toLocaleString()}
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-4">
                  {product.inStock ? (
                      <span className="text-green-600 font-medium">✔️ {t("product.inStock")}</span>
                  ) : (
                      <span className="text-red-600 font-medium">❌ {t("product.outOfStock")}</span>
                  )}
              </div>

               {/* Short Description */}
              {product.shortDescription && (
                  <p className="text-base mb-6 leading-relaxed">
                      {product.shortDescription}
                  </p>
              )}
            </div>
            
            <div className="add-to-cart-wrapper mt-auto border-t border-border pt-6">
              <ProductUpgrades 
                upgrades={product.upgrades} 
                onUpgradesChange={setUpgradesPrice} 
              />
              
              <AddToCartSection 
                basePrice={product.price} 
                salePrice={product.salePrice}
                upgradesPrice={upgradesPrice}
                inStock={product.inStock}
              />
              
              <DeliveryOptions options={product.deliveryOptions} />
            </div>
          </div>
          
           {/* Left Column (RTL) / Right Column (LTR): Product Gallery */}
           <div className="w-full lg:w-1/2 order-1 lg:order-2">
             <ProductGallery 
                images={product.images} 
                youtubeVideoUrl={product.youtubeVideoUrl} 
                productName={product.name} 
              />
           </div>
        </div>
        
        {/* Specs and Description Sections */}
        <div className="mt-12 lg:mt-24">
            <ProductSpecs specs={product.specs} />
            <ProductDescription content={product.longDescription} />
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-12 lg:mt-24 border-t border-border pt-12">
             <ProductGrid 
                title={t("product.relatedProducts")} 
                products={product.relatedProducts} 
              />
          </div>
        )}
      </div>
    </div>
  );
}
