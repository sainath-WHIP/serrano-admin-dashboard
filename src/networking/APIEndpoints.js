//server URL
const URL = "https://api.serrano.in";

const SERRANO_URL = `${URL}/api/v2/admin`;

// Admin Register (Create)
export const adminRegisterURL = SERRANO_URL + "/create-admin";

//Admin Login
export const adminLoginURL = SERRANO_URL + "/login-admin";

//Admin Logout
export const adminLogoutURL = SERRANO_URL + "/logout";

//Admin Profile
export const getAdminProfileURL = SERRANO_URL + "/getAdmin";

export const updateAdminInfoURL = SERRANO_URL + "/update-admin-profile";

export const updateAdminAvatarURL = SERRANO_URL + "/update-admin-avatar";

//All Users
export const getAllUsersURL = SERRANO_URL + "/get-users";

//All Shops(Sellers)
export const getAllSellersURL = SERRANO_URL + "/get-seller";

export const updateSellerInfoURL = SERRANO_URL + "/update-seller-info/";

export const deleteSellerURL = SERRANO_URL + "/seller/";

//All Products
export const createProductURL = SERRANO_URL + "/create-product";

export const getAllProductsURL = SERRANO_URL + "/admin-all-products";

export const updateProductInfoURL = SERRANO_URL + "/products/";

export const deleteProductURL = SERRANO_URL + "/products/";

//All Orders
export const getAllOrdersURL = SERRANO_URL + "/orders";

//Security
export const changePasswordURL = SERRANO_URL + "/change-password";

export const forgotPasswordURL = SERRANO_URL + "/forgot-password";

export const resetPasswordURL = SERRANO_URL + "/reset-password";
