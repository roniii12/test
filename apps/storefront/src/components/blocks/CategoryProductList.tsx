"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n";
import { ProductCard } from "@/components/blocks/ProductCard";
import type { Product } from "@/config";

interface CategoryProductListProps {
  initialProducts: any[]; // Using any to avoid type check issues for payload generic types for now
}

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export function CategoryProductList({ initialProducts }: CategoryProductListProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    result.sort((a, b) => {
      const priceA = a.salePrice || a.price || 0;
      const priceB = b.salePrice || b.price || 0;
      
      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        default:
          return 0;
      }
    });

    return result;
  }, [products, sortBy, inStockOnly]);

  return (
    <div className="category-product-list">
      {/* Filters & Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-muted/20 p-4 rounded-lg border border-border mb-8 gap-4">
        
        <div className="flex items-center gap-4">
            <span className="font-semibold">{filteredAndSortedProducts.length} {t("category.products") || "Products"}</span>
            
            <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                    type="checkbox" 
                    checked={inStockOnly} 
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                />
                {t("category.inStockOnly") || "In Stock Only"}
            </label>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium whitespace-nowrap">
            {t("sort.label") || "Sort by:"}
          </label>
          <select 
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-border rounded-md px-3 py-2 bg-background focus:ring-primary focus:border-primary"
          >
            <option value="price-asc">{t("sort.priceAsc") || "Price: Low to High"}</option>
            <option value="price-desc">{t("sort.priceDesc") || "Price: High to Low"}</option>
            <option value="name-asc">{t("sort.nameAsc") || "Name: A to Z"}</option>
            <option value="name-desc">{t("sort.nameDesc") || "Name: Z to A"}</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
             // @ts-ignore - Ignore type mismatches between payload and static types temporarily
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/10 rounded-lg border border-border border-dashed">
          <p className="text-xl text-muted-foreground">{t("category.noProductsFound") || "No products found matching your criteria."}</p>
          <button 
             onClick={() => { setInStockOnly(false); setSortBy('price-asc'); }}
             className="mt-4 text-primary hover:underline"
          >
             {t("category.clearFilters") || "Clear filters"}
          </button>
        </div>
      )}
    </div>
  );
}
