import { useEffect } from "react";
import { trackOrderConfirmEvent } from "@sitecore-search/react";
import { useShoppingCart } from "@/context/shoppingCartContext.tsx";

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const Order = () => {
  const { cartItems, removeItemFromCart } = useShoppingCart();
  useEffect(() => {
    trackOrderConfirmEvent("product", {
      items: cartItems.map(({ id, quantity, price }) => {
        removeItemFromCart(id);
        return {
          id,
          price,
          quantity,
        };
      }),
      orderId: makeid(10),
    });
  }, []);
  return (
    <div>
      <h2 className="text-black dark:text-white text-2xl mb-4">
        Thanks for your order!
      </h2>
    </div>
  );
};

export default Order;
