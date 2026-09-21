"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";

interface ProductImage {
  image?: {
    url?: string;
    alt?: string;
  } | number | null;
  alt?: string | null;
}

interface ProductGalleryProps {
  images?: ProductImage[] | null;
  youtubeVideoUrl?: string | null;
  productName: string;
}

export function ProductGallery({ images, youtubeVideoUrl, productName }: ProductGalleryProps) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter out any invalid images and extract URLs
  const validImages = images?.map(img => {
    if (img && typeof img.image === 'object' && img.image?.url) {
        return {
            url: img.image.url,
            alt: img.alt || img.image.alt || productName,
        }
    }
    return null;
  }).filter(Boolean) as { url: string, alt: string }[] || [];

  const hasImages = validImages.length > 0;

  return (
    <div className="product-gallery">
      {/* Main Image Area */}
      <div className="product-gallery-main relative aspect-square bg-muted/20 border border-border rounded-lg overflow-hidden flex items-center justify-center mb-4">
        {hasImages ? (
            <Image 
              src={validImages[activeIndex].url} 
              alt={validImages[activeIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
        ) : (
            <span className="text-6xl opacity-20">📦</span>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && validImages.length > 1 && (
        <div className="product-gallery-thumbnails flex gap-2 overflow-x-auto pb-2 snap-x">
          {validImages.map((img, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-colors snap-center ${
                index === activeIndex ? "border-primary" : "border-transparent hover:border-primary/50"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image 
                src={img.url} 
                alt={`${t("product.thumbnail")} ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
          
          {/* YouTube Thumbnail if available */}
           {youtubeVideoUrl && (
             <button
                className={`relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden object-cover border-2 transition-colors snap-center flex items-center justify-center bg-zinc-900 border-transparent hover:border-red-500`}
                onClick={() => {
                   window.open(youtubeVideoUrl, '_blank')
                }}
              >
                  <span className="text-red-600 text-3xl">▶</span>
              </button>
           )}
        </div>
      )}
    </div>
  );
}
