import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { updateProductInfoURL } from "../../../networking/APIEndpoints";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("idparams", id);
  const { product } = useSelector((state) => state.productData);
  console.log("productsData all", product);

  const filteredProduct = product.find((s) => s._id === id);

  const [inputdata, setInputdata] = useState({
    name: "",
    category: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    description: "",
    images: null,
  });
  useEffect(() => {
    if (filteredProduct) {
      setInputdata({
        name: filteredProduct.name || "",
        category: filteredProduct.category || "",
        originalPrice: filteredProduct.originalPrice || "",
        discountPrice: filteredProduct.discountPrice || "",
        stock: filteredProduct.stock || "",
        description: filteredProduct.description || "",
        images: filteredProduct.images || "",
      });
    }
  }, [filteredProduct]);
  console.log("imput", inputdata.name);
  console.log("filteredProduct.name", filteredProduct.name);

  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  const updateProductInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputdata.name);
    formData.append("category", inputdata.category);
    formData.append("originalPrice", inputdata.originalPrice);
    formData.append("discountPrice", inputdata.discountPrice);
    formData.append("stock", inputdata.stock);
    formData.append("description", inputdata.description);
    formData.append("images", inputdata.images);

    try {
      const { data } = await axios.put(
        updateProductInfoURL + filteredProduct?._id,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("{data} update", data);
      const response = data?.message;
      toast(response);
      setTimeout(() => {
        navigate("/products");
      }, 3000);
    } catch (error) {
      console.log("error", error);
    }
  };
  const onChangeImage = (e) => {
    setInputdata({ ...inputdata, images: e.target.files[0] });
  };

  return (
    <>
      <Layout>
        <div className="mb-5">
          <h2 className="text-black font-semibold text-xl mb-3 ">
            Update Product Info :<span className="ml-3">{id}</span>
          </h2>
        </div>
        <div className="bg-[#c4c4c4] p-10 rounded-md mb-10">
          <form className="w-full max-w-full">
            <div className="grid grid-cols-2">
              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Product Name
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="text"
                  value={inputdata.name}
                  name="name"
                  autoComplete
                  placeholder="Enter Product Name"
                  onChange={data}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Original Price
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="number"
                  value={inputdata.originalPrice}
                  name="originalPrice"
                  placeholder="Enter Price"
                  onChange={data}
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Price (With Discount)
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="number"
                  value={inputdata.discountPrice}
                  name="discountPrice"
                  placeholder="Enter Price"
                  onChange={data}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  categories
                </label>
                <select
                  className=" capitalize block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="text"
                  value={inputdata.category}
                  name="category"
                  placeholder="Enter category"
                  onChange={data}
                  required
                >
                  <option className=" text-md   font-medium capitalize">
                    wine
                  </option>
                  <option className=" text-md   font-medium capitalize">
                    liquor
                  </option>
                  <option className=" text-md   font-medium capitalize">
                    beer
                  </option>
                  <option className=" text-md   font-medium capitalize">
                    extras
                  </option>
                </select>
              </div>
              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Stock
                </label>
                <input
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="number"
                  value={inputdata.stock}
                  name="stock"
                  placeholder="Product Stock"
                  onChange={data}
                  required
                />
              </div>

              <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                  type="text"
                  value={inputdata.description}
                  name="description"
                  placeholder="Description"
                  onChange={data}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-10 w-10 rounded-md overflow-hidden">
                    {inputdata.images ? (
                      <img
                        src={inputdata.images}
                        alt="images"
                        className="h-full w-full object-cover rounded-md"
                      />
                    ) : (
                      <img
                        src={inputdata.images}
                        alt="images"
                        className="h-full w-full object-cover rounded-md"
                      />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="images"
                      required
                      id="file-input"
                      onChange={onChangeImage}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
              <div className="w-full md:w-full pl-3  md:mb-2 flex items-center">
                <button
                  type="submit"
                  className="px-4 py-2 text-white text-sm font-medium shadow-md rounded-md  bg-black"
                  onClick={updateProductInfo}
                >
                  Update Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default ProductDetails;
