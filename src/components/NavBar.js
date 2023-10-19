import { useState } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBag, BsBagPlus } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { PiPackageDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";

const NavBar = () => {
  const [open, setOpen] = useState(true);

  const IsActiveLink = (path) => {
    const location = useLocation();
    return location.pathname === path;
  };

  const Dashboard = () => {
    return <MdOutlineDashboard size={23} />;
  };

  const UserList = () => {
    return <HiOutlineUserGroup size={22} />;
  };
  const CreateProduct = () => {
    return <BsBagPlus size={21} />;
  };
  const ProductList = () => {
    return <BsBag size={21} />;
  };

  const Shops = () => {
    return <AiOutlineShop size={25} />;
  };
  const Orders = () => {
    return <PiPackageDuotone size={24} />;
  };

  const menuItems = [
    { id: 1, label: "Dashboard", icon: Dashboard, link: "/dashboard" },
    { id: 2, label: "Users", icon: UserList, link: "/users" },
    { id: 3, label: "Products", icon: ProductList, link: "/products" },
    {
      id: 4,
      label: "CreateProduct",
      icon: CreateProduct,
      link: "/create-product",
    },
    { id: 5, label: "Shops", icon: Shops, link: "/shops" },
    { id: 6, label: "Orders", icon: Orders, link: "/orders" },
  ];
  return (
    <>
      <div className="flex overflow-y-hidden overflow-x-hidden">
        <div
          className={`bg-[#000]  pt-3 pl-3  ${
            open ? "w-[200px] " : "w-[75px]"
          } duration-700 text-gray-900 `}
        >
          <div className="">
            <div
              className="flex justify-end mb-5"
              onClick={() => setOpen(!open)}
            >
              <div className=" rounded-full border-2 cursor-pointer w-8 h-8 justify-center items-center flex">
                <LuChevronLeft
                  className={` text-[#ff0000] text-2xl  ${
                    !open && "rotate-180"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center mb-5 ">
            <div className="px-1 py-3.5 bg-[#fff] rounded-md">
              <p className="text-black font-bold text-[10px] tracking-wide  ">
                Serrano
              </p>
            </div>
            <h2
              style={{
                transitionDelay: `50ms`,
              }}
              className={` duration-700  text-[#fff] font-semibold text-lg ${
                !open && "opacity-0 translate-x-28 overflow-hidden "
              }`}
            >
              Admin
            </h2>
          </div>

          <div className="flex flex-col gap-3 overflow-x-hidden pb-20 overflow-y-auto h-[90%] ">
            {menuItems.map(({ label, icon: Icon, link, id, i }) => (
              <Link
                to={link}
                key={id}
                title={open ? "" : label}
                className={` 
                  group flex items-center  gap-3.5 text-sm  p-1 rounded-md ${
                    IsActiveLink(link) ? "text-red-500 " : "text-[#fff]  "
                  } `}
              >
                <div>
                  <Icon />
                </div>
                <p
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-700  ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {label}
                </p>
              </Link>
            ))}
            <Dropdown open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
