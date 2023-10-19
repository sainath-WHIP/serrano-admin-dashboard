import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiGearLight } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";

const Dropdown = ({ open, i }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [expandedicon, setExpandedIcon] = useState(false);

  const handleToggle = () => {
    if (open === false) {
      setExpandedIcon(!expandedicon);
    } else {
      setExpanded(!expanded);
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
    setExpanded(false);
    setExpandedIcon(false);
  };

  return (
    <div className="relative" onClick={handleToggle}>
      {!open && (
        <div className="relative">
          <div className="cursor-pointer">
            <p className="p-1" title="Settings">
              <PiGearLight size={24} color="white" />
            </p>
          </div>
          {expandedicon && (
            <div className="absolute">
              <div
                className=" p-1.5  mt-2"
                onClick={() => handleNavigation("/profile")}
              >
                <p className="cursor-pointer" title="Profile">
                  <FaUserEdit color="white" size={18} />
                </p>
              </div>
              <div
                className=""
                onClick={() => handleNavigation("/change-password")}
              >
                <p className="p-1.5 cursor-pointer" title="ChangePassword">
                  <BsShieldLock color="white" size={18} />
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="cursor-pointer flex  gap-3.5 group p-1 items-center duration-700">
        <PiGearLight
          size={24}
          color="white"
          className={` duration-700  ${
            !open && "opacity-0 translate-x-28 overflow-hidden  "
          }`}
        />
        <p
          className={`text-[#fff] text-sm  duration-700  ${
            !open && "opacity-0 translate-x-28 overflow-hidden "
          }`}
        >
          Settings
        </p>
      </div>
      {expanded && (
        <div className="absolute">
          <div
            className=" bg-white rounded-md px-16 py-1 flex justify-center mb-1 mt-2"
            onClick={() => handleNavigation("/profile")}
          >
            <p className="cursor-pointer text-sm font-medium hover:text-lime-600 text-[#000] ">
              Profile
            </p>
          </div>
          <div
            className=" bg-white rounded-md  py-1 flex justify-center"
            onClick={() => handleNavigation("/change-password")}
          >
            <p className="text-[#000] text-sm font-medium hover:text-red-600 cursor-pointer">
              Change Password
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
