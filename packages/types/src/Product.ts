import type { Product as PayloadProduct } from "./payload-types";

export type Product = PayloadProduct;
export type ProductImage = NonNullable<PayloadProduct["images"]>[number];
export type ProductSpec = NonNullable<PayloadProduct["specs"]>[number];
export type ProductHighlight = NonNullable<PayloadProduct["highlights"]>[number];
export type ProductUpgrade = NonNullable<PayloadProduct["upgrades"]>[number];
export type ProductDeliveryOption = NonNullable<PayloadProduct["deliveryOptions"]>[number];
