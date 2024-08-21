import { ProductModel } from "@types.ts";
import { trackAddToCartEvent } from "@sitecore-search/react";
import notFoundImg from "@/assets/notFound.png";
import { CartModel } from "@/context/shoppingCartContext.tsx";

export const onAddToCartClick = (
  product: ProductModel,
  increaseItemQuantity: (product: CartModel) => void,
  toast: any,
) => {
  increaseItemQuantity({
    id: product.id,
    price: product.party_price || 10.0,
    name: product.name,
    image: product.image_url || notFoundImg,
  });
  trackAddToCartEvent("product", {
    items: [
      {
        id: product.id,
        price: product.party_price,
        finalPrice: product.party_price,
        quantity: 1,
      },
    ],
  });
  toast({
    title: `$'${product.id}' Added Successfully`,
    variant: "success",
  });
};
