import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "@/context/shoppingCartContext";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, cartQuantity } = useShoppingCart();
  return (
    <div className="relative">
      <button className="btn-header" onClick={() => setOpen((prev) => !prev)}>
        <ShoppingCart />
      </button>
      {cartQuantity > 0 && (
        <div className="rounded-full p-[1px] pt-[0px] text-xs top-[-5px] z-[5000] w-[16px] h-[16px] text-center bg-red-500 text-white absolute right-[-5px]">
          {cartQuantity}
        </div>
      )}
      {open && cartQuantity > 0 && (
        <div className="absolute p-2 top-[32px] w-[300px] border-gray-400 bg-gray-100 dark:bg-gray-600 rounded-sm shadow-lg sm:rounded-lg right-0">
          <ul>
            <li className="h-[30px] flex items-center p-2 text-sm text-gray-700 dark:text-gray-200 font-bold">
              <div className="cart-cell"></div>
              <div className="cart-cell cart-cell-product">Name</div>
              <div className="cart-cell">Price</div>
              <div className="cart-cell">Quantity</div>
            </li>
            {cartItems.map((item) => (
              <li className="h-[60px] flex items-center p-2 text-sm text-gray-700 dark:text-gray-200 overflow-hidden">
                <div className="cart-cell">
                  <img
                    className="w-[40px] rounded border border-gray-100"
                    src={item.image}
                  />
                </div>
                <div className="cart-cell cart-cell-product">
                  <span className="ml-1">{item.name}</span>
                </div>
                <div className="cart-cell">
                  <span className="ml-1">${item.price}</span>
                </div>
                <div className="cart-cell">
                  <span className="ml-1">{item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full border-t-2 border-t-gray-400 text-center">
            <button
              className="add-to-cart w-[100px]"
              onClick={() => {
                navigate("/cart");
                setOpen(false);
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
