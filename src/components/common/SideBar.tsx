import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { faClipboard, faShop, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const baseClass = "flex items-center space-x-2 rounded-lg px-4 py-2 transition-colors";
  const activeClass = "bg-[#3AC48D]";
  const inactiveClass = "hover:bg-[#3AC48D]";
  const activeTextClass = "text-white";
  const inactiveTextClass = "text-gray-400";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  const renderNavLinkContent = (icon: IconDefinition, text: string) => {
    // NavLink가 호출할 함수를 반환합니다.
    return ({ isActive }: { isActive: boolean }) => {
      const textClass = isActive ? activeTextClass : inactiveTextClass;

      return (
        <>
          <FontAwesomeIcon className={textClass} icon={icon} />
          <span className={textClass}>{text}</span>
        </>
      );
    };
  };

  return (
    <div className="sticky top-0 flex h-screen w-2xs flex-col gap-2 bg-[#1B1B1B] p-4">
      <Link to="/" className="p-4">
        <h1 className="text-center text-3xl text-white">PG Admin</h1>
      </Link>
      <div className="flex flex-col gap-2">
        <NavLink to="/" className={getNavLinkClass}>
          {renderNavLinkContent(faSquarePollVertical, "대시보드")}
        </NavLink>

        <NavLink to="/payment-list" className={getNavLinkClass}>
          {renderNavLinkContent(faClipboard, "거래내역")}
        </NavLink>

        <NavLink to="/merchants-list" className={getNavLinkClass}>
          {renderNavLinkContent(faShop, "가맹점 관리")}
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
