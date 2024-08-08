import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, ReactNode, useContext } from "react";

type CartModel = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type CartItem = CartModel & {
  quantity: number;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: string) => number;
  increaseItemQuantity: (cartItem: CartModel) => void;
  decreaseItemQuantity: (id: string) => void;
  removeItemFromCart: (id: string) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(cartItem: CartModel) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === cartItem.id) == null) {
        return [...currentItems, { ...cartItem, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: string) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, input: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItemFromCart(id: string) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
