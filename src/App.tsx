import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WidgetsProvider } from "@sitecore-search/react";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Order from "@/pages/Order";
import Header from "@/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import { ShoppingCartProvider } from "@/context/shoppingCartContext";
import { StoreProvider } from "@/context/storeContext";

function App() {
  return (
    <StoreProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <WidgetsProvider
            apiKey={import.meta.env.VITE_SEARCH_API_KEY}
            env={import.meta.env.VITE_SEARCH_ENV}
            publicSuffix={true}
            customerKey={import.meta.env.VITE_SEARCH_CUSTOMER_KEY}
          >
            <div className="bg-white dark:bg-gray-700 flex">
              <Header />
              <main className="w-[80%] m-auto mt-[120px] min-h-[700px]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Order />} />
                </Routes>
                <Toaster />
              </main>
            </div>
          </WidgetsProvider>
        </BrowserRouter>
      </ShoppingCartProvider>
    </StoreProvider>
  );
}

export default App;
