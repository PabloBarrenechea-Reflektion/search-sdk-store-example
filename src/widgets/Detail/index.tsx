import {
  widget,
  WidgetDataType,
  useSearchResults,
  FilterEqual,
} from "@sitecore-search/react";
import { ProductModel } from "@types.ts";
import Spinner from "@/components/Spinner";
import React from "react";
import notFoundImg from "@/assets/notFound.png";
import { ShoppingCart } from "lucide-react";
import { onAddToCartClick } from "@/utils";
import { useToast } from "@/components/ui/use-toast.ts";
import { useShoppingCart } from "@/context/shoppingCartContext.tsx";

type InitialState = {
  itemsPerPage: number;
};

const DetailComponent = ({ id }: { id: string }) => {
  const { increaseItemQuantity } = useShoppingCart();
  const { toast } = useToast();
  const {
    queryResult: { isLoading, data: { content: products = [] } = {} },
  } = useSearchResults<ProductModel, InitialState>({
    query: (query) => {
      const equalFilter = new FilterEqual("id", id);
      query.getRequest().setSearchFilter(equalFilter);
    },
    state: {
      itemsPerPage: 1,
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-gray-600 opacity-50">
        <Spinner loading />
      </div>
    );
  }
  const product = products.length > 0 ? products[0] : null;
  return (
    <>
      {product && (
        <div className="dark:text-gray-100">
          <h1 className="text-2xl">{product.name}</h1>
          <div className="flex justify-items-end mt-4 items-top">
            <div className="w-1/4">
              <img
                src={product.image_url || notFoundImg}
                className="rounded-sm border border-gray-300 dark:border-gray-400"
              />
            </div>
            <div className="w-3/4 items-end relative">
              <span>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </span>
              <button
                className="add-to-cart absolute bottom-0 left-1/3 w-[150px]  "
                onClick={() =>
                  onAddToCartClick(product, increaseItemQuantity, toast)
                }
              >
                <ShoppingCart /> <label className="ml-2">Add to cart</label>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default widget(
  DetailComponent,
  WidgetDataType.SEARCH_RESULTS,
  "product",
);
