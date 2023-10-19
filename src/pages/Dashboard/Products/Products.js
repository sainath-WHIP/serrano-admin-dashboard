import React, { useEffect, useRef, useState } from "react";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";
import Layout from "../../../components/Layout";
import axios from "axios";
import { DeleteProductAlert } from "../../../components/CustomAlerts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Moment from "react-moment";
import Loadnig from "../../../components/Loadnig";
import { HiOutlineUserGroup } from "react-icons/hi";
import { setProductData } from "../../../redux/reducers/productSlice";
import { getAllProductsURL } from "../../../networking/APIEndpoints";

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
function Products() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [array, setArray] = useState([]);
  const [newlist, setNewList] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const pageSize = 6;

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(getAllProductsURL, {
          withCredentials: true,
        });
        console.log("all products data", data?.products);
        setArray(data?.products);
        const products = data?.products;
        console.log("products", products);
        dispatch(setProductData(products));
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const filteredList = array.filter((item) => {
      const { name, category } = item;
      const lowerCaseSearch = search.toLowerCase();

      if (search === "") {
        return true;
      }

      if (name && name.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }

      if (category && category.toLowerCase().includes(lowerCaseSearch)) {
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
    setSelectedProductId(id);
    setModalOpen(true);
    console.log("selectedProductId", selectedProductId);
  };
  const handleClearClick = () => {
    setSearch("");
    searchRef.current.value = "";
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
        return record.category === statusFilter;
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
              <h1 className="text-black font-semibold text-lg mb-3 ">
                Products
              </h1>
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
                <option className=" text-md   font-medium capitalize text-gray-600">
                  wine
                </option>
                <option className=" text-md font-medium capitalize text-gray-600">
                  liquor
                </option>
                <option className=" text-md font-medium capitalize text-gray-600">
                  beer
                </option>
                <option className=" text-md font-medium capitalize text-gray-600">
                  extras
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
              <div className="overflow-x-scroll mb-4 ">
                <table className="w-full bg-[#C4C4C4] overflow-hidden mb-2 rounded-xl">
                  <thead className="">
                    <tr className=" text-black text-sm font-medium ">
                      <th className="px-6 py-3 text-left">
                        Product Id{" "}
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
                      <th className="px-6 py-3 text-left">
                        Product Name{" "}
                        <button onClick={sortByName}>
                          {sortByNameAsc ? <span>▲</span> : <span>▼</span>}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left">Category</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Stock</th>
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
          <DeleteProductAlert
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            productId={selectedProductId}
          />
        </>
      )}
    </Layout>
  );
}
export default Products;

function Tr({
  _id,
  name,
  category,
  originalPrice,
  discountPrice,
  stock,
  description,
  images,
  createdAt,
  formVisiblehandler,
  modalDeleteHandler,
}) {
  const navigate = useNavigate();
  const navigateToProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <tr className="text-black text-base  border-b border-[#999999]  text-left text-[15px]">
      <td className="px-6 py-2 whitespace-nowrap ">{_id}</td>
      <td className="px-6 py-2 whitespace-nowrap ">
        <Moment format="YYYY-MM-DD HH:mm:ss.SSS">{createdAt}</Moment>
      </td>
      <td className="px-6 py-2 whitespace-nowrap">
        <a target="_blank" rel="noreferrer" href={images}>
          <img
            src={images[0]}
            alt="shop image"
            className="cursor-pointer w-18 h-11"
          />
        </a>
      </td>
      <td className="px-6 py-2 whitespace-nowrap capitalize">{name}</td>
      <td className="px-6 py-2 whitespace-nowrap capitalize">{category}</td>
      <td className="px-6 py-2   break-words">{originalPrice}</td>
      <td
        className={` px-6 py-2  font-semibold  capitalize ${
          stock >= 100 ? "text-lime-600" : "text-red-600"
        }`}
      >
        {stock}
      </td>
      <td className=" flex flex-row mt-2 px-6 py-2 whitespace-nowrap gap-6">
        <div className="">
          <div onClick={formVisiblehandler}>
            <button
              className=" "
              title="Edit"
              onClick={() => navigateToProductDetails(_id)}
            >
              <TbEdit size={25} color="green" />
            </button>
          </div>
        </div>

        <button
          className=" "
          title="Delete"
          onClick={() => modalDeleteHandler(_id)}
        >
          <MdOutlineDelete size={25} color="red" />
        </button>
      </td>
    </tr>
  );
}
