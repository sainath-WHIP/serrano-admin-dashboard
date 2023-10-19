import { useState } from "react";
import NavBar from "./NavBar";
import TopHeader from "./TopHeader";

function Layout({ children }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (

    <div className="h-screen flex flex-row">
      <NavBar />
      <div className="flex-1 overflow-hidden">
        <TopHeader
          profileDropdownOpen={profileDropdownOpen}
          toggleProfileDropdown={toggleProfileDropdown}
        />
        <div className="bg-[#ccc] p-4 overflow-y-auto h-full pb-20">
          {children}
        </div>
      </div>
    </div>
    
  );

}

export default Layout;
