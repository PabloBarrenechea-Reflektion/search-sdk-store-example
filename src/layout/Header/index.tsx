import { Link } from "react-router-dom";
import { DarkmodeSwitch } from "@/components/DarkModeSwitcher";
import Cart from "@/components/Cart";

const Header = () => {
  return (
    <div className="header-outer">
      <div className="header-inner">
        <div>
          <Link to={"/"}>
            <img
              src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore?t=sc42h"
              alt="App logo"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <label>Store:</label>
            <select className="select">
              <option selected value="4008">
                4008
              </option>
              <option value="4005">4005</option>
              <option value="4073">4073</option>
              <option value="4078">4078</option>
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
