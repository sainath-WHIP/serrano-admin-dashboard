import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { FaUserEdit } from "react-icons/fa";
import {
  getAdminProfileURL,
  updateAdminAvatarURL,
  updateAdminInfoURL,
} from "../../../networking/APIEndpoints";
import Loading from "../../../components/Loading";

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  console.log("consoloe", userInfo);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getAdminuser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(getAdminProfileURL, {
          withCredentials: true,
        });
        console.log("data", data?.admin);
        const resp = data?.admin;
        setUserInfo(resp);
        setLoading(false);
      } catch (error) {
        console.log("eror", error);
      }
    };
    getAdminuser();
  }, []);

  const updateUserInfo = async () => {
    try {
      const response = await axios.put(
        updateAdminInfoURL,
        {
          name: userInfo.name,
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
        },
        { withCredentials: true }
      );
      const resp = response.data;
      console.log("resp11", resp);
      toast(resp?.message);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.log(" api is not working ", error);
    }
  };

  return (
    <>
      <Layout>
        {loading === true ? (
          <Loading />
        ) : (
          <>
            <div className="">
              <div className="flex items-center justify-center">
                <div className="bg-[#C4C4C4] px-14 py-10 w-[65%] rounded-[20px] shadow-lg ">
                  <div className="flex justify-between  ">
                    <div className="flex items-center justify-center  ">
                      <div className="">
                        <div className="">
                          <div className="">
                            <img
                              src={userInfo.avatar}
                              className="w-32 h-32 rounded-full "
                            />
                          </div>

                          <div
                            onClick={() => setModalOpen(true)}
                            className="flex justify-center items-center bg-[#CCCCCC] rounded-md mt-5  cursor-pointer"
                          >
                            <h2 className="text-[#fff]">Edit Profile</h2>

                            <div className=" p-2 rounded-full ">
                              <FaUserEdit className="text-xl text-[#fff] " />
                            </div>
                          </div>
                        </div>
                        <p className="text-center text-sm font-medium mt-5 capitalize">
                          {userInfo?.name}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#ccc] w-[2px]" />
                    <div className="flex flex-col justify-center w-[50%] ">
                      <div className="flex flex-col mb-5 gap-2">
                        <label className="text-sm font-semibold">Name</label>
                        <input
                          type="text"
                          placeholder="Enter Full Name"
                          name="name"
                          value={userInfo.name}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, name: e.target.value })
                          }
                          className="py-2 px-4 bg-[#F3F3F3] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm "
                        />
                      </div>
                      <div className="flex flex-col mb-5 gap-2">
                        <label className="text-sm font-semibold">Email</label>
                        <input
                          type="email"
                          placeholder="Enter Email Address"
                          name="email"
                          value={userInfo.email}
                          onChange={(e) =>
                            setUserInfo({ ...userInfo, email: e.target.value })
                          }
                          className="py-2 px-4 bg-[#F3F3F3] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm "
                        />
                      </div>

                      <div className="flex flex-col mb-5 gap-2">
                        <label className="text-sm font-semibold">
                          Mobile Number
                        </label>
                        <input
                          type="number"
                          placeholder="Enter Mobile Number"
                          name="phoneNumber"
                          value={userInfo.phoneNumber}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="py-2 px-4 bg-[#F3F3F3] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm "
                        />
                      </div>

                      <div className="flex justify-end mt-6">
                        <button
                          className="bg-black rounded text-white w-full py-2"
                          onClick={updateUserInfo}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProfileModal
              Profile={userInfo?.avatar}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
          </>
        )}
      </Layout>
    </>
  );
}
export default ProfilePage;

export const ProfileModal = ({ Profile, setModalOpen, modalOpen }) => {
  const [avatar, setAvatar] = useState("");

  const handleAvatar = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageFile = e.target.querySelector('input[type="file"]').files[0];
    formData.append("avatar", imageFile);
    formData.append("avatar", avatar);
    try {
      const response = await fetch(updateAdminAvatarURL, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      toast(data?.message);
      console.log("data", data);
      setModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
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
    <div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

          <div className="modal-container bg-[#C4C4C4] w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold ">Profile Update</p>
                <div
                  onClick={() => setModalOpen(false)}
                  className="modal-close cursor-pointer z-50 flex "
                >
                  <div className="bg-[#fff] rounded-full border cursor-pointer w-8 h-8 justify-center items-center flex">
                    <RxCross2 className={"text-[#ff0000] text-2xl"} />
                  </div>
                </div>
              </div>

              <img
                src={avatar}
                alt="Profile Image"
                className="rounded-full mx-auto "
                style={{ width: "150px", height: "150px" }}
              />

              <form method="put" onSubmit={handleAvatar} className="mt-10">
                <div className="flex justify-evenly items-center">
                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700"
                    ></label>
                    <div>
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            <RxAvatar className="h-8 w-8" />
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
                            id="file-input"
                            onChange={handleFileInputChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-black rounded text-white px-4 py-1.5 "
                  >
                    Update profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
