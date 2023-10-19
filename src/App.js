import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Main/Dashboard";
import Users from "./pages/Dashboard/Users/Users";
import Products from "./pages/Dashboard/Products/Products";
import Shops from "./pages/Dashboard/Sellers/Shops";
import Profile from "./pages/Dashboard/Profile/Profile";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register/Register";
import { Provider } from "react-redux";
import Store from "./redux/store";
import ForgotPassword from "./pages/Dashboard/Secutity/ForgotPassword";
import ResetPassword from "./pages/Dashboard/Secutity/ResetPassword";
import ChangePassword from "./pages/Dashboard/Secutity/ChangePassword";
import ShopDetails from "./pages/Dashboard/Sellers/ShopDetails";
import ProductDetails from "./pages/Dashboard/Products/ProductDetails";
import CreateProduct from "./pages/Dashboard/Products/CreateProduct";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";
import Order from "./pages/Dashboard/Orders/Order";
import OrderDetails from "./pages/Dashboard/Orders/OrderDetails";
function App() {
  let persistor = persistStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shops"
              element={
                <ProtectedRoute>
                  <Shops />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shops/:id"
              element={
                <ProtectedRoute>
                  <ShopDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:activation_token"
              element={<ResetPassword />}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
