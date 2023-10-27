import React, { useEffect, useRef, useState } from "react";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";
import Layout from "../../../components/Layout";
import axios from "axios";
import { DeleteSellerAlert } from "../../../components/CustomAlerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSellerData } from "../../../redux/reducers/sellerSlice";
import { toast } from "react-toastify";
import Loadnig from "../../../components/Loading";
import { getAllSellersURL } from "../../../networking/APIEndpoints";
import Moment from "react-moment";

const Total_Income = () => {
  return <GiMoneyStack size={27} color="white" />;
};
const Daily_Income = () => {
  return <GiTakeMyMoney size={27} color="white" />;
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
    title: "All Shops",
    amount: "1,22,345",
    icon: All_Shops,
    background: "bg-red-600",
  },
  {
    id: 4,
    title: "New Shops",
    amount: "22,345",
    icon: All_Shops,
    background: "bg-blue-600",
  },
];
function Shops() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [array, setArray] = useState([]);
  const [newlist, setNewList] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const pageSize = 6;

  useEffect(() => {
    const getAllSellers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(getAllSellersURL, {
          withCredentials: true,
        });
        console.log("all sellers data", data?.shops);
        const sellers = data?.shops.reverse();
        setArray(sellers);
        console.log("sellers", sellers);
        dispatch(setSellerData(sellers));
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllSellers();
  }, []);

  useEffect(() => {
    const filteredList = array.filter((item) => {
      const { name, email, phoneNumber, status } = item;
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
    setCurrentPage(1);
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
  const modalDeleteHandler = (id) => {
    setSelectedSellerId(id);
    setModalOpen(true);
    console.log("selectedSellerId", selectedSellerId);
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

  // Sort by Shop Id
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

  return (
    <Layout>
      {loading === true ? (
        <Loadnig />
      ) : (
        <>
          <div className="">
            <div className="">
              <h1 className="text-black font-semibold text-lg mb-3 ">Shops</h1>
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
                name="status"
                className={` block  font-medium bg-transparent  cursor-pointer   capitalize border border-[#000]  rounded-md py-1.5 px-5 leading-tight focus:outline-none `}
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option className=" text-md   font-medium capitalize text-gray-600">
                  all
                </option>
                <option className=" text-md   font-medium capitalize text-red-600">
                  pending
                </option>
                <option className=" text-md font-medium capitalize text-lime-600">
                  approved
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
                <table className="w-full bg-[#C4C4C4] overflow-hidden mb-2  rounded-xl">
                  <thead className="">
                    <tr className=" text-black text-sm font-medium ">
                      <th className="px-6 py-3 text-left">
                        Shop Id{" "}
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
                      <th className="px-6 py-3 text-left">Image</th>
                      <th className="px-6 py-3 text-left">AadharCard</th>
                      <th className="px-6 py-3 text-left">PanCard</th>
                      <th className="px-6 py-3 text-left">ShopLicense</th>
                      <th className="px-6 py-3 text-left">
                        Shop Name{" "}
                        <button onClick={sortByName}>
                          {sortByNameAsc ? <span>▲</span> : <span>▼</span>}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">Number</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Address</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {currentRecords &&
                      currentRecords.map((item, id) => {
                        return (
                          <Tr
                            {...item}
                            key={id}
                            _id={item._id}
                            modalDeleteHandler={modalDeleteHandler}
                          />
                        );
                      })}
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
          <DeleteSellerAlert
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            sellerId={selectedSellerId}
          />
        </>
      )}
    </Layout>
  );
}
export default Shops;

function Tr({
  _id,
  name,
  email,
  address,
  status,
  phoneNumber,
  formVisiblehandler,
  avatar,
  modalDeleteHandler,
  aadharCard,
  panCard,
  shopLicense,
  createdAt,
}) {
  const navigate = useNavigate();
  const navigateToSellerDetails = (sellerId) => {
    navigate(`/shops/${sellerId}`);
  };

  return (
    <tr className="text-black text-base  border-b border-[#999999]  text-left text-[15px]">
      <td className="px-6 py-2 whitespace-nowrap ">{_id}</td>
      <td className="px-6 py-2 whitespace-nowrap ">
        <Moment format="YYYY-MM-DD HH:mm:ss">{createdAt}</Moment>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <a target="_blank" rel="noreferrer" href={avatar}>
          <img
            src={avatar}
            alt="shop image"
            className="cursor-pointer w-16 h-7"
          />
        </a>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <a target="_blank" rel="noreferrer" href={aadharCard}>
          <img
            src={aadharCard}
            alt="aadharCard"
            className="cursor-pointer w-16 h-7"
          />
        </a>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <a target="_blank" rel="noreferrer" href={panCard}>
          <img
            src={panCard}
            alt="panCard"
            className="cursor-pointer w-16 h-7"
          />
        </a>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <a target="_blank" rel="noreferrer" href={shopLicense}>
          <img
            src={shopLicense}
            alt="shopLicense"
            className="cursor-pointer w-16 h-7"
          />
        </a>
      </td>

      <td className="px-6 py-2 whitespace-nowrap">{name}</td>
      <td className="px-6 py-2 whitespace-nowrap">{phoneNumber}</td>
      <td className="px-6 py-2   break-words">{email}</td>
      <td
        className={` px-6 py-2  font-semibold  capitalize ${
          status === "approved" ? "text-lime-600" : "text-red-600"
        }`}
      >
        {status}
      </td>
      <td className="px-6 py-2  whitespace-nowrap">{address}</td>
      <td className=" flex flex-row mt-2 px-6 py-2 whitespace-nowrap gap-6">
        <div className="">
          <div onClick={formVisiblehandler}>
            <button
              className=" "
              title="Edit"
              onClick={() => navigateToSellerDetails(_id)}
            >
              <TbEdit size={25} color="green" />
            </button>
          </div>
        </div>

        <button
          className=""
          title="Delete"
          onClick={() => modalDeleteHandler(_id)}
        >
          <MdOutlineDelete size={25} color="red" />
        </button>
      </td>
    </tr>
  );
}
