import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateSellerInfoURL } from "../../../networking/APIEndpoints";

function ShopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("idparams", id);
  const { seller } = useSelector((state) => state.sellersData);
  console.log("sellerDetails all", seller);

  const filteredSeller = seller.find((s) => s._id === id);

  const [inputdata, setInputdata] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    status: "",
  });

  useEffect(() => {
    if (filteredSeller) {
      setInputdata({
        name: filteredSeller.name || "",
        email: filteredSeller.email || "",
        phoneNumber: filteredSeller.phoneNumber || "",
        address: filteredSeller.address || "",
        zipCode: filteredSeller.zipCode || "",
        status: filteredSeller.status || "",
      });
    }
  }, [filteredSeller]);

  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  const updateSellerInfo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        updateSellerInfoURL + filteredSeller?._id,
        inputdata,
        { withCredentials: true }
      );
      console.log("{data} update", data);
      const response = data?.message;
      toast(response);
      setTimeout(() => {
        navigate("/shops");
      }, 3000);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="mb-5">
          <h2 className="text-black font-semibold text-xl mb-3 ">
            Update Seller Info :<span className="ml-3">{id}</span>
          </h2>
        </div>
        <div className="bg-[#c4c4c4] p-10 rounded-md mb-10">
          <form className="w-full max-w-full">
            <div className="grid grid-cols-2">
              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Shop Name
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="text"
                  value={inputdata.name}
                  name="name"
                  autoComplete
                  placeholder="Enter Shop Name"
                  onChange={data}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Mobile Number
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="number"
                  value={inputdata.phoneNumber}
                  name="phoneNumber"
                  placeholder="Enter Mobile Number"
                  onChange={data}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Email address
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="email"
                  value={inputdata.email}
                  name="email"
                  placeholder="Enter email"
                  onChange={data}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Address
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="text"
                  value={inputdata.address}
                  name="address"
                  placeholder="Enter Shop Address"
                  onChange={data}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  zipCode
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="text"
                  value={inputdata.zipCode}
                  name="zipCode"
                  placeholder="Enter zipCode"
                  onChange={data}
                  required
                />
              </div>

              <div className=" w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Status
                </label>
                <select
                  name="status"
                  className={` block w-full font-medium  cursor-pointer   capitalize border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300`}
                  value={inputdata.status}
                  onChange={data}
                >
                  <option className=" text-md   font-medium capitalize text-red-600">
                    pending
                  </option>
                  <option className=" text-md font-medium capitalize text-lime-600">
                    approved
                  </option>
                </select>
              </div>
              <div className="w-full md:w-full pl-3 mb-0 md:mb-2   items-center flex">
                <button
                  type="submit"
                  className="px-4 py-2 text-white text-sm font-medium shadow-md rounded-md  bg-black"
                  onClick={updateSellerInfo}
                >
                  Update Seller
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default ShopDetails;
