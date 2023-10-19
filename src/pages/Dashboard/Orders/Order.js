import React, { useEffect, useRef, useState } from "react";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { PiPackageDuotone } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import Layout from "../../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import Loadnig from "../../../components/Loadnig";
import { setOrdersData } from "../../../redux/reducers/ordersSlice";
import { getAllOrdersURL } from "../../../networking/APIEndpoints";

const Total_Income = () => {
  return <GiMoneyStack size={27} color="white" />;
};
const Daily_Income = () => {
  return <GiTakeMyMoney size={27} color="white" />;
};

const Orders = () => {
  return <PiPackageDuotone size={26} color="white" />;
};

const Labels = [
  {
    id: 1,
    title: "Total Income",
    amount: "11,22,345",
    icon: Total_Income,
    background: "bg-black",
  },
  {
    id: 2,
    title: "Daily Income",
    amount: "22,345",
    icon: Daily_Income,
    background: "bg-lime-500",
  },
  {
    id: 3,
    title: "All Orders",
    amount: "1,22,345",
    icon: Orders,
    background: "bg-red-600",
  },
  {
    id: 4,
    title: "New Orders",
    amount: "22,345",
    icon: Orders,
    background: "bg-blue-600",
  },
];
function Order() {
  const [search, setSearch] = useState("");
  const [array, setArray] = useState([]);
  const [newlist, setNewList] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  // const reversedData = [...array].reverse();

  const dispatch = useDispatch();
  const searchRef = useRef();
  const pageSize = 6;

  // console.log("reverse",reversedData)
  // console.log("array",array)



  useEffect(() => {
    const getAllOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(getAllOrdersURL, {
          withCredentials: true,
        });
        console.log("all orders data", data?.orders);
        setArray(data?.orders);

        const orderData = data?.orders;
        console.log("orderData", orderData);
        dispatch(setOrdersData(orderData));
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllOrder();
  }, []);

  useEffect(() => {
    const filteredList = array.filter((item) => {
      const { user, cart } = item;
      const lowerCaseSearch = search.toLowerCase();

      // If the search is empty, include the item in the result
      if (search === "") {
        return true;
      }

      // Check if user name contains the search query (if user name is available)
      if (
        user &&
        user.name &&
        user.name.toLowerCase().includes(lowerCaseSearch)
      ) {
        return true;
      }
      if (
        user &&
        user.phoneNumber &&
        user.phoneNumber.toString().toLowerCase().includes(lowerCaseSearch)
      ) {
        return true;
      }

      // Check if the product name in the cart contains the search query (if available)
      if (cart && cart.length > 0) {
        const product = cart[0];
        if (
          product.name &&
          product.name.toLowerCase().includes(lowerCaseSearch)
        ) {
          return true;
        }
      }

      // Check if the shop name in the cart contains the search query (if available)
      if (cart && cart.length > 0) {
        const product = cart[0];
        if (
          product.shop &&
          product.shop.name &&
          product.shop.name.toLowerCase().includes(lowerCaseSearch)
        ) {
          return true;
        }
      }

      return false;
    });

    setNewList(filteredList);
    setCurrentPage(1);
  }, [search, array]);

  const lastIndex = currentpage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentRecords = newlist.slice(firstIndex, lastIndex);
  const totalRecords = newlist.length;

  const nPage = Math.ceil(totalRecords / pageSize);
  // const pageNumbers = [...Array(nPage).keys()].map((num) => num + 1);

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
      const nameA = a.cart[0]?.shop?.name || "";
      const nameB = b.cart[0]?.shop?.name || "";

      if (nameA && nameB) {
        if (sortByNameAsc) {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      } else {
        return 0;
      }
    });
    setNewList(sortedList);
  };

  // Sort by Order Id
  const sortById = () => {
    setSortByIdAsc(!sortByIdAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      if (sortByIdAsc) {
        return a._id - b._id;
      } else {
        return b._id - a._id;
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

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    const filteredList = array.filter((record) => {
      if (statusFilter === "all") {
        return true;
      } else {
        return record.status === statusFilter;
      }
    });
    setNewList(filteredList);
  }, [statusFilter]);
  const navigate = useNavigate();
  const navigateToOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };
  return (
    <Layout>
      {loading === true ? (
        <Loadnig />
      ) : (
        <>
          <div className="">
            <div className="">
              <h1 className="text-black font-semibold text-lg mb-3 ">Orders</h1>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1   gap-4 mb-10">
              {Labels.map(({ id, title, amount, icon: Icon, background }) => (
                <div
                  className="bg-[#fff] flex items-center gap-6 p-6 rounded-md break-all shadow-xl"
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

            <div className="flex justify-end items-center  mb-6 gap-10">
              <select
                name="category"
                className={` block  font-medium bg-transparent  cursor-pointer   capitalize border border-[#000]  rounded-md py-1.5 px-5 leading-tight focus:outline-none `}
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option className=" text-md   font-medium capitalize text-gray-600">
                  all
                </option>
                <option className=" text-md   font-medium capitalize text-red-600">
                  Processing
                </option>
                <option className=" text-md   font-medium capitalize text-blue-600 ">
                  Confirmed
                </option>
                <option className=" text-md font-medium capitalize text-lime-600">
                  Delivered
                </option>
              </select>
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
                      className={"text-[#ff0000] text-xl cursor-pointer"}
                    />
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="overflow-x-scroll mb-4">
                <table className="w-full bg-[#C4C4C4] rounded-xl mb-2 overflow-hidden">
                  <thead className="">
                    <tr className=" text-black text-sm font-bold ">
                      <th className="px-6 py-3 text-left">
                        Order Id{" "}
                        <button onClick={sortById}>
                          {sortByIdAsc ? <span>▲</span> : <span>▼</span>}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        CreatedAt{" "}
                        <button onClick={sortByCreatedAt}>
                          {sortByCreatedAtAsc ? <span>▲</span> : <span>▼</span>}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">
                        Shop Name{" "}
                        <button onClick={sortByName}>
                          {sortByNameAsc ? <span>▲</span> : <span>▼</span>}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((order) => (
                      <tr
                        key={order._id}
                        className="text-black text-base font-normal border-b border-[#999999]  text-left text-[15px]"
                      >
                        <td
                          onClick={() => navigateToOrderDetails(order._id)}
                          className="px-6 py-2 whitespace-nowrap cursor-pointer hover:underline"
                        >
                          {order._id}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          <Moment format="YYYY-MM-DD HH:mm:ss">
                            {order.createdAt}
                          </Moment>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap capitalize">
                          {order.cart[0].shop.name}
                        </td>

                        <td
                          className={` px-6 py-2  font-semibold  capitalize ${
                            order?.status === "Delivered"
                              ? "text-lime-600"
                              : order?.status === "Confirmed"
                              ? "text-blue-600 "
                              : "text-red-600"
                          }`}
                        >
                          {order.status}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap capitalize">
                          {order.cart[0].shop.address}
                        </td>
                      </tr>
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
                  className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white   ${
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
          </div>
        </>
      )}
    </Layout>
  );
}
export default Order;
