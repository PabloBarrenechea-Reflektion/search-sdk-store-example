import { useEffect } from "react";
import { PageController, trackOrderConfirmEvent } from "@sitecore-search/react";
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
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const store = PageController.getContext().getStore();
  useEffect(() => {
    trackOrderConfirmEvent("product", {
      items: cartItems.map(({ id, quantity, price }) => {
        removeItemFromCart(id);
        return {
          id,
          price,
          finalPrice: price,
          quantity,
        };
      }),
      orderId: makeid(10),
      orderTotal: total,
      orderSubtotal: total,
      store,
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
