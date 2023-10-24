import React, { useEffect, useRef, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";
import Layout from "../../../components/Layout";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import Loadnig from "../../../components/Loadnig";
import { getAllUsersURL } from "../../../networking/APIEndpoints";
import Moment from "react-moment";
const Total_Income = () => {
  return <GiMoneyStack size={27} color="white" />;
};
const Daily_Income = () => {
  return <GiTakeMyMoney size={27} color="white" />;
};
const All_Users = () => {
  return <HiOutlineUserGroup size={27} color="white" />;
};
const All_Shops = () => {
  return <AiOutlineShop size={27} color="white" />;
};
const Labels = [
  {
    id: 1,
    title: "Total Income",
    amount: "11,22,345",
    icon: Total_Income,
    background: "bg-gray-600",
  },
  {
    id: 2,
    title: "Daily Income",
    amount: "22,345",
    icon: Daily_Income,
    background: "bg-orange-600",
  },
  {
    id: 3,
    title: "All Users",
    amount: "1,22,345",
    icon: All_Users,
    background: "bg-purple-600",
  },
  {
    id: 4,
    title: "All Shops",
    amount: "22,345",
    icon: All_Shops,
    background: "bg-red-600",
  },
];

function Users() {
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState("");
  const [newlist, setNewList] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const searchRef = useRef();
  const pageSize = 6;

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(getAllUsersURL, {
          withCredentials: true,
        });
        console.log("all users data", data?.users);
        const orderData = data?.users.reverse();

        setArray(orderData || []);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllUsers();
  }, []);

  useEffect(() => {
    const filteredList = array.filter((item) => {
      const { name, email, phoneNumber } = item;
      const lowerCaseSearch = search.toLowerCase();

      if (search === "") {
        return true;
      }

      if (name && name.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }

      if (email && email.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }
      if (
        phoneNumber &&
        phoneNumber.toString().toLowerCase().includes(lowerCaseSearch)
      ) {
        return true;
      }

      return false;
    });
    setNewList(filteredList);
  }, [search, array]);

  const lastIndex = currentpage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentRecords = newlist.slice(firstIndex, lastIndex);
  const totalRecords = newlist.length;

  const nPage = Math.ceil(totalRecords / pageSize);

  const prePage = () => {
    if (currentpage !== 1) {
      setCurrentPage(currentpage - 1);
    }
  };

  const nextPage = () => {
    if (currentpage < nPage) {
      setCurrentPage(currentpage + 1);
    }
  };
  const handleClearClick = () => {
    setSearch("");
    searchRef.current.value = ""; // Clear the input field's value
  };
  // Sort by Shop Name
  const sortByName = () => {
    setSortByNameAsc(!sortByNameAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      if (sortByNameAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setNewList(sortedList);
  };

  //sort by created at
  const sortByCreatedAt = () => {
    setSortByCreatedAtAsc(!sortByCreatedAtAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      if (sortByCreatedAtAsc) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setNewList(sortedList);
  };
  return (
    <Layout>
      {loading === true ? (
        <Loadnig />
      ) : (
        <>
          <div className="">
            <div className="mb-5">
              <h1 className="text-black font-semibold text-lg ">Users List</h1>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1  gap-4 mb-10">
              {Labels.map(({ id, title, amount, icon: Icon, background }) => (
                <div
                  className="bg-[#fff] flex items-center gap-6 p-6 rounded-md break-all  shadow-xl"
                  key={id}
                >
                  <div className={`${background} p-2 rounded-md`}>
                    <Icon />
                  </div>
                  <div className="">
                    <p className="text-black text-base font-medium">{title}</p>
                    <p className="font-bold">{amount}</p>
                  </div>
                </div>
              ))}
            </div>
            {array.length === 0 ? (
              <p className="text-center font-medium text-sm text-black mt-36 ">
                No data found...
              </p>
            ) : (
              <>
                <div className="flex justify-end items-end mb-6">
                  <div className="rounded-md px-4 py-1 border border-black w-[30%] flex justify-center items-center">
                    <input
                      className="text-base mb-1 bg-transparent   text-black placeholder-black focus:outline-none w-full"
                      type="text"
                      ref={searchRef}
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value.trim())}
                    />
                    {search.length > 0 && (
                      <p onClick={handleClearClick}>
                        <RxCross2
                          className={"text-[#ff0000] text-xl cursor-pointer "}
                        />
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full bg-[#C4C4C4] overflow-hidden mb-2  rounded-xl">
                      <thead>
                        <tr className=" text-black font-medium text-sm">
                          <th className="px-6 py-3 text-left">User Id</th>
                          <th className="px-6 py-3 text-left">
                            CreatedAt{" "}
                            <button onClick={sortByCreatedAt}>
                              {sortByCreatedAtAsc ? (
                                <span>▲</span>
                              ) : (
                                <span>▼</span>
                              )}
                            </button>
                          </th>
                          <th className="px-6 py-3 text-left">
                            Name{" "}
                            <button onClick={sortByName}>
                              {sortByNameAsc ? <span>▲</span> : <span>▼</span>}
                            </button>
                          </th>
                          <th className="px-6 py-3 text-left">Email</th>
                          <th className="px-6 py-3 text-left">Number</th>
                          <th className="px-6 py-3 text-left">Address</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {currentRecords &&
                          currentRecords.map((item, id) => (
                            <Tr {...item} key={id} />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex justify-center items-center ">
                    <p className="text-sm text-black ">
                      <span className="">Showing</span>
                      <span className="font-medium ml-1">{currentpage}</span>
                      <span className="ml-1">to</span>
                      <span className="font-medium ml-1">
                        {Math.min(lastIndex, totalRecords)}
                      </span>
                      <span className="ml-1">of</span>
                      <span className="font-medium ml-1">{totalRecords}</span>
                      <span className="ml-1">results</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={prePage}
                      className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white   ${
                        currentpage === 1 ? "hidden" : ""
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2"
                        fill="black"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Prev
                    </button>
                    <p className="text-sm text-black flex justify-center items-center ">
                      <span className="">Page</span>
                      <span className="font-medium ml-1">{currentpage}</span>
                      <span className="ml-1">of</span>
                      <span className="font-medium ml-1">{nPage}</span>
                    </p>
                    <button
                      onClick={nextPage}
                      className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white ${
                        currentpage === nPage ? "hidden" : ""
                      }`}
                    >
                      Next
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 ml-2"
                        fill="black"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}
export default Users;
function Tr({ _id, name, email, phoneNumber, addresses, createdAt }) {
  return (
    <tr className="text-black  border-b border-[#999999] text-left text-[15px]">
      <td className=" px-6 py-2 whitespace-nowrap ">{_id}</td>
      <td className=" px-6 py-2 whitespace-nowrap">
        <Moment format="YYYY-MM-DD HH:mm:ss ">{createdAt}</Moment>
      </td>
      <td className="px-6 py-2  whitespace-nowrap ">{name}</td>
      <td className="px-6 py-2 whitespace-nowrap  ">{email}</td>
      <td className="px-6 py-2 whitespace-nowrap">
        {phoneNumber.toString().slice(2)}
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        {addresses && addresses.length > 0
          ? `${addresses[0].address1}, ${addresses[0].address2}, ${addresses[0].city}, ${addresses[0].country} ${addresses[0].zipCode}`
          : "N/A"}
      </td>
    </tr>
  );
}
