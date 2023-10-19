import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";

function OrderDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [expanded, setExpanded] = useState({});
  //   const [search, setSearch] = useState("");
  //   const [newlist, setNewList] = useState([]);
  //   const searchRef = useRef();

  const { order } = useSelector((state) => state.orderData);

  console.log("orderData", order);

  const filteredData = order.find((item) => item._id === id);

  useEffect(() => {
    // Add a check to ensure that 'filteredData' is not null before setting state
    if (filteredData) {
      setData(filteredData.cart);
      setUser(filteredData.user);
    }
  }, [order]);
  console.log("data", data);
  console.log("filteredData", filteredData);

  //   useEffect(() => {
  //     const filteredList = data.filter((item) => {
  //       const { name } = item;
  //       // console.log("item",item)
  //       const lowerCaseSearch = search.toLowerCase();

  //       // If the search is empty, include the item in the result
  //       if (search === "") {
  //         return true;
  //       }

  //       // Check if name contains the search query (if name is available)
  //       if (name && name.toLowerCase().includes(lowerCaseSearch)) {
  //         return true;
  //       }

  //       // If neither name nor email matches the search query, exclude the item
  //       return false;
  //     });
  //     setNewList(filteredList);
  //   }, [search, data]);

  //   const handleClearClick = () => {
  //     setSearch("");
  //     searchRef.current.value = ""; // Clear the input field's value
  //   };
  const toggleItem = (itemId) => {
    setExpanded((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId],
    }));
  };
  return (
    <Layout>
      <div>
        <div className="mb-5">
          <h2 className="text-black font-semibold text-xl">
            Order Info :<span className="ml-3">{id}</span>
          </h2>
        </div>
        {/* <div className="rounded-md px-4 py-1 border border-black w-[30%] flex justify-center items-center mb-10">
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
              <RxCross2 className={"text-[#ff0000] text-xl "} />
            </p>
          )}
        </div> */}
        <div className="mb-3">
          <h3 className="text-black font-semibold text-base mb-3 ">
            Product Info :
          </h3>
        </div>
        <div className="bg-[#c4c4c4] p-4 rounded-xl  mb-10">
          <table>
            <thead>
              <tr className="text-black text-sm font-bold">
                <th className="px-6 py-3 text-left ">Image</th>
                <th className="px-6 py-3 text-left ">Product Name</th>
                <th className="px-6 py-3 text-left ">Price</th>
                <th className="px-6 py-3 text-left ">Quantity</th>
                <th className="px-6 py-3 text-left ">SubTotal</th>
                <th className="px-6 py-3 text-left ">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item,index) => (
                <tr
                  key={index}
                  className="text-base font-normal text-black text-[15px]"
                >
                  <td className="px-6 py-2 whitespace-nowrap">
                    <a target="_blank" rel="noreferrer" href={item.images}>
                      <img
                        src={item.images}
                        alt="shop image"
                        className="cursor-pointer w-16"
                      />
                    </a>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap ">{item.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap ">
                    {item.originalPrice}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap ">{item.qty}</td>
                  <td className="px-6 py-2 whitespace-nowrap ">
                    {item.qty * item.originalPrice}
                  </td>

                  <td className="px-6 py-2">
                    {expanded[item.id]
                      ? item.description
                      : `${item.description.substring(0, 80)}...`}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="text-red-600 font-medium"
                    >
                      {expanded[item.id] ? "Read Less" : "Read More"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"></td>
                <td className="px-6 py-3 text-left text-base font-medium text-black  tracking-[1px]">
                  Total :
                </td>
                <td className="px-6 py-3 text-left text-base font-bold text-red-600 tracking-[1px]">
                  &#8377;{filteredData.totalPrice}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mb-3">
          <h3 className="text-black font-semibold text-base mb-3 ">
            User Info :
          </h3>
        </div>
        <div className="bg-[#c4c4c4] p-4 rounded-xl">
          <table>
            <thead>
              <tr className="text-black text-sm font-bold ">
                <th className="px-6 py-3 text-left ">userId</th>
                <th className="px-6 py-3 text-left ">Name</th>
                <th className="px-6 py-3 text-left ">Number</th>
                <th className="px-6 py-3 text-left ">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr
                key={user._id}
                className="text-base font-normal text-black text-[15px]"
              >
                <td className="px-6 py-2 whitespace-nowrap hover:underline ">
                  <Link to={"/users"}>{user._id}</Link>
                </td>
                <td className="px-6 py-2 whitespace-nowrap ">{user.name}</td>
                <td className="px-6 py-2 whitespace-nowrap ">
                  {user.phoneNumber}
                </td>
                <td className="px-6 py-2 whitespace-nowrap ">
                  {user.addresses && user.addresses.length > 0
                    ? `${user.addresses[0].address1}, ${user.addresses[0].address2}, ${user.addresses[0].city}, ${user.addresses[0].country} ${user.addresses[0].zipCode}`
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
