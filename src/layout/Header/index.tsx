import { Link } from "react-router-dom";
import { DarkmodeSwitch } from "@/components/DarkModeSwitcher";
import Cart from "@/components/Cart";
import Logo from "@/components/Logo";

const Header = () => {
  return (
    <div className="header-outer">
      <div className="header-inner">
        <div>
          <Link to={"/"}>
            <Logo />
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
