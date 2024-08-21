import { useLocalStorage } from "../hooks/useLocalStorage";
import { createContext, ReactNode, useContext } from "react";
import { PageController } from "@sitecore-search/react";

type StoreModel = {
  id?: string;
  groupId?: string;
};

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContextType = {
  setStore: (store: StoreModel) => void;
  id: string;
  groupId: string;
};

const StoreContext = createContext({} as StoreContextType);

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [store, setStore] = useLocalStorage<StoreModel>("store", {
    id: "psp_supplier_101",
    groupId: "AnonymousGroup",
  });
  store.id && PageController.getContext().setStoreId(store.id);
  store.groupId && PageController.getContext().setStoreGroupId(store.groupId);
  const changeStore = (store: StoreModel) => {
    setStore(store);
    store.id && PageController.getContext().setStoreId(store.id);
    store.groupId && PageController.getContext().setStoreGroupId(store.groupId);
  };

  return (
    <StoreContext.Provider
      value={{
        id: store.id || "",
        groupId: "",
        setStore: changeStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
