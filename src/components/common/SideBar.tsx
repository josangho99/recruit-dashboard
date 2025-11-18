import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { faClipboard, faShop, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const baseClass = "flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors";
  const activeClass = "bg-gray-700 font-bold";
  const inactiveClass = "hover:bg-gray-700";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <div className="sticky top-0 flex h-screen w-3xs flex-col gap-2 bg-gray-800 p-4 text-white">
      <Link to="/" className="p-4">
        <h1 className="text-center text-3xl">PG Admin</h1>
      </Link>

      <NavLink to="/" className={getNavLinkClass}>
        <FontAwesomeIcon icon={faSquarePollVertical} />
        <span>대시보드</span>
      </NavLink>

      <NavLink to="/payment-list" className={getNavLinkClass}>
        <FontAwesomeIcon icon={faClipboard} />
        <span>거래내역</span>
      </NavLink>

      <NavLink to="/merchants-list" className={getNavLinkClass}>
        <FontAwesomeIcon icon={faShop} />
        <span>가맹점 관리</span>
      </NavLink>
    </div>
  );
}

export default SideBar;
