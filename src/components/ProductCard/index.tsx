// This component was generated by @sitecore-search/cli on Mon Aug 05 2024 08:51:27 GMT+0000 (Coordinated Universal Time)
import { trackAddToCartEvent } from "@sitecore-search/react";
import type { ActionProp, ItemClickedAction } from "@sitecore-search/react";
import { ProductCard } from "@sitecore-search/ui";
import { useToast } from "@/components/ui/use-toast";
import { useShoppingCart } from "@/context/shoppingCartContext.tsx";
import { ShoppingCart } from "lucide-react";
import notFoundImg from "@/assets/notFound.png";

type ProductItemCardProps = {
  className?: string;
  product: any;
  onItemClick: ActionProp<ItemClickedAction>;
  index: number;
};

const ProductItemCard = ({
  className,
  product,
  onItemClick,
  index,
}: ProductItemCardProps) => {
  const { increaseItemQuantity } = useShoppingCart();
  const { toast } = useToast();
  const onAddToCartClick = (product: any, toast: any) => {
    increaseItemQuantity({
      id: product.id,
      price: product.price || 10.0,
      name: product.name,
      image: product.image_url || notFoundImg,
    });
    trackAddToCartEvent("product", { items: [{ id: product.id }] });
    toast({
      title: `$'${product.id}' Added Successfully`,
      variant: "success",
    });
  };
  return (
    <ProductCard.Root
      className={`group flex flex-col relative text-center border rounded shadow-[2px_2px_4px] shadow-gray-400 hover:shadow-gray-500 ${className}`}
    >
      <div className="mb-2 flex h-[150px] justify-center items-center overflow-hidden group-hover:opacity-75">
        <ProductCard.Image
          src={product.image_url || notFoundImg}
          className="w-full"
        />
      </div>
      <ProductCard.Content className="m-0 flex grow flex-col items-stretch">
        <div className="text-xs leading-normal text-black dark:text-white font-light">
          {product.sku}
        </div>
        <ProductCard.Name className="text-base mt-2 font-normal leading-relaxed h-[50px] overflow-hidden">
          <a
            href={product.url}
            onClick={() =>
              onItemClick({
                id: product.id,
                index,
                sourceId: product.source_id,
              })
            }
            className="text-black dark:text-white hover:cursor-pointer focus:outline-gray-400"
          >
            <span aria-hidden="true" className="absolute inset-0"></span>
            {product.name}
          </a>
        </ProductCard.Name>
        <button
          className="add-to-cart"
          onClick={() => onAddToCartClick(product, toast)}
        >
          <ShoppingCart /> <label className="ml-2">Add to cart</label>
        </button>
        {product.price && (
          <span className="flex grow justify-center items-end text-sm text-gray-700 dark:text-white font-light mt-3">
            ${product.price}
          </span>
        )}
      </ProductCard.Content>
    </ProductCard.Root>
  );
};
export default ProductItemCard;
