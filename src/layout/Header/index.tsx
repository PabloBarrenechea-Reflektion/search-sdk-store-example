import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { DarkmodeSwitch } from "@/components/DarkModeSwitcher";
import Cart from "@/components/Cart";
import Logo from "@/components/Logo";
import { useStore } from "@/context/storeContext";

const Header = () => {
  const { setStore, id, groupId } = useStore();
  const changeStore = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStore({ id: e.target.value, groupId });
  };
  const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStore({ id, groupId: e.target.value });
  };
  return (
    <div className="header-outer">
      <div className="header-inner">
        <div>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="ml-2 flex items-center">
            <label className="text-sm">Store</label>
            <MapPin />
            <select className="select" onChange={changeStore}>
              <option
                value="psp_supplier_101"
                selected={id === "psp_supplier_101"}
              >
                psp_supplier_101
              </option>
              <option
                value="psp_supplier_105"
                selected={id === "psp_supplier_105"}
              >
                psp_supplier_105
              </option>
              <option
                value="psp_supplier_109"
                selected={id === "psp_supplier_109"}
              >
                psp_supplier_109
              </option>
            </select>
          </div>
          <div className="ml-2 flex items-center">
            <label className="text-sm">Group</label>
            <Users />
            <select className="select" onChange={changeGroup}>
              <option
                value="AnonymousGroup"
                selected={groupId === "AnonymousGroup"}
              >
                Anonymous Group
              </option>
              <option value="SecondBuyer" selected={groupId === "SecondBuyer"}>
                Second Buyer
              </option>
              <option
                value="defaultBuyer"
                selected={groupId === "defaultBuyer"}
              >
                Default Buyer
              </option>
            </select>
          </div>
          <div className="ml-1">
            <DarkmodeSwitch />
          </div>
          <div className="ml-1">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
