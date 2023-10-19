import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/serrano.png";
import { useState } from "react";
import { LogOutAlert } from "./CustomAlerts";

const TopHeader = ({ profileDropdownOpen, toggleProfileDropdown }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleLogoutModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="px-10 py-2 bg-[#CCCCCC] ">
      <div className="flex justify-end items-end">
        <div className="flex items-center">
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer "
            onClick={toggleProfileDropdown}
          />
          {profileDropdownOpen && (
            <div className="absolute top-[50px] right-5 bg-white border rounded-lg px-4 py-1 cursor-pointer">
              <ul>
                <Link to="/profile">
                  <li
                    title="Profile "
                    className="text-sm font-medium hover:text-lime-600"
                  >
                    Profile
                  </li>
                </Link>

                <li
                  title="Logout"
                  onClick={handleLogoutModal}
                  className="text-sm font-medium hover:text-red-600"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <LogOutAlert modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default TopHeader;
