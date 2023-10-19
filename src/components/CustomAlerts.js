import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  adminLogoutURL,
  deleteProductURL,
  deleteSellerURL,
} from "../networking/APIEndpoints";

export const DeleteSellerAlert = ({ sellerId, setModalOpen, modalOpen }) => {
  const deleteSeller = async (id) => {
    try {
      const response = await axios.delete(deleteSellerURL + id, {
        withCredentials: true,
      });
      console.log("sellerid", id);
      if (response.status === 200) {
        console.log("Seller deleted successfully.", id);
        const data = response?.data?.message;
        toast(data);
      } else {
        console.error("Failed to delete seller. Status code:", response.status);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Confirm Delete</p>
              </div>

              <p className="text-lg">
                Are you sure you want to delete the seller?
              </p>

              <div className="flex justify-end pt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md "
                  onClick={() => deleteSeller(sellerId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DeleteProductAlert = ({ productId, setModalOpen, modalOpen }) => {
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(deleteProductURL + id, {
        withCredentials: true,
      });
      console.log("productId", id);
      if (response.status === 200) {
        console.log("product deleted successfully.", id);
        const data = response?.data?.message;
        toast(data);
        // window.location.reload();
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      } else {
        console.error(
          "Failed to delete product. Status code:",
          response.status
        );
      }
      setModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Confirm Delete</p>
              </div>

              <p className="text-lg">
                Are you sure you want to delete the product?
              </p>

              <div className="flex justify-end pt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md "
                  onClick={() => deleteProduct(productId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const LogOutAlert = ({ setModalOpen, modalOpen }) => {
  const navigate = useNavigate();
  const LogoutHandler = async () => {
    try {
      const response = await fetch(adminLogoutURL);
      const { success, message } = await response.json();
      console.log("success", success);
      console.log("message", message);

      if (response.status === 201) {
        console.log("Logout successful");
        localStorage.clear("admin_token");
        navigate("/");
        toast(message);
      } else {
        console.log("Logout failed");
        toast(message);
      }
      setModalOpen(false);
    } catch (error) {
      console.log("error logout", error);
    }
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Confirm Logout</p>
              </div>

              <p className="text-lg">Are you sure you want to Logout!</p>

              <div className="flex justify-end pt-6">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md "
                  onClick={LogoutHandler}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
