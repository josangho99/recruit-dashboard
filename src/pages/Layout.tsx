import SideBar from "@/components/common/SideBar";
import Header from "@/components/common/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();
  let title = "DashBoard";
  switch (location.pathname) {
    case "/payment-list":
      title = "PaymentList";
      break;
    case "/merchants-list":
      title = "MerchantsList";
      break;

    default:
      title = "DashBoard";
      break;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex w-full flex-col bg-[#F2F3F0] px-10 py-10">
        <Header title={title} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
