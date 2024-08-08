import { useEffect } from "react";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackStatusCartEvent } from "@sitecore-search/react";
import { useShoppingCart } from "@/context/shoppingCartContext.tsx";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeItemFromCart } = useShoppingCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  useEffect(() => {
    trackStatusCartEvent("product", {
      items: cartItems.map(({ id, quantity, price }) => ({
        id,
        price,
        quantity,
      })),
    });
  }, []);

  return (
    <div>
      <h2 className="text-black dark:text-white text-2xl mb-4">
        Shopping cart
      </h2>
      <div className="flex">
        <div className="w-4/6 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="cart-header-cell"></th>
                <th scope="col" className="cart-header-cell">
                  Name
                </th>
                <th scope="col" className="cart-header-cell">
                  Quantity
                </th>
                <th scope="col" className="cart-header-cell">
                  Price
                </th>
                <th scope="col" className="cart-header-cell">
                  Total Price
                </th>
                <th scope="col" className="cart-header-cell"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 p-2">
                  <td className="cart-table-cell">
                    <img
                      src={item.image}
                      className="border-gray-400 w-[30px]"
                    />
                  </td>
                  <td className="cart-table-cell">{item.name}</td>
                  <td className="cart-table-cell">{item.quantity}</td>
                  <td className="cart-table-cell">${item.price}</td>
                  <td className="cart-table-cell">
                    ${item.price * item.quantity}
                  </td>
                  <td className="cart-table-cell">
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/6 px-4">
          <div className="rounded text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400 p-4">
            <div className="flex">
              <label>Total:</label>
              <span className="ml-4"> ${total}</span>
            </div>
            <div className="border-t-gray-400 border-t-2">
              <button
                className="add-to-cart w-[80px]"
                onClick={() => navigate("/order")}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
