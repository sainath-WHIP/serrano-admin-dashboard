import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { GiWineBottle } from "react-icons/gi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createProductURL } from "../../../networking/APIEndpoints";
function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("description", description);
    const imageFile = e.target.querySelector('input[type="file"]').files[0];
    formData.append("images", imageFile);
    try {
      const response = await fetch(createProductURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      toast(data?.message);
      console.log("data ", data);
      setTimeout(() => {
        navigate("/products");
      }, 3000);
      // window.location.href = '/products'
    } catch (error) {
      console.log("Network Error:", error);
    }
  };
  const handleFileInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Layout>
      <div className="">
        <h1 className="text-black font-semibold text-lg mb-3 ">
          Create Products
        </h1>
      </div>
      <div className="bg-[#c4c4c4] p-10 rounded-md mb-10">
        <form
          className="w-full max-w-full"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2">
            <div className="w-full md:w-full px-3 mb-6 md:mb-2">
              <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                Product Name
              </label>
              <input
                className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                type="text"
                value={name}
                name="name"
                autoComplete
                placeholder="Enter Product Name"
                onChange={(e) => setName(e.target.value)}
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
                value={originalPrice}
                name="originalPrice"
                placeholder="Enter Price"
                onChange={(e) => setOriginalPrice(e.target.value)}
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
                value={discountPrice}
                name="discountPrice"
                placeholder="Enter Price"
                onChange={(e) => setDiscountPrice(e.target.value)}
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
                value={category}
                name="category"
                placeholder="Enter category"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled className="text-gray-300">
                  Select Categorie
                </option>
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
                value={stock}
                name="stock"
                placeholder="Product Stock"
                onChange={(e) => setStock(e.target.value)}
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
                value={description}
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-12 w-12 rounded-md overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-md"
                    />
                  ) : (
                    <GiWineBottle className="h-12 w-12" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    required
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="w-full md:w-full pl-3  md:mb-2 flex items-center">
              <button
                type="submit"
                className="px-4 py-2 text-white text-sm font-medium shadow-md rounded-md  bg-black"
              >
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateProduct;
