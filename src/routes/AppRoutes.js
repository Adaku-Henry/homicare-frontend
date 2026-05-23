import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../features/auth/pages/Login";
import Register from "../../features/auth/pages/Register";

import UserDashboard from "../../features/dashboard/user/UserDashboard";
import ProviderDashboard from "../../features/dashboard/provider/ProviderDashboard";
import AdminDashboard from "../../features/dashboard/admin/AdminDashboard";

import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user"
          element={
            <RoleRoute role="user">
              <UserDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/provider"
          element={
            <RoleRoute role="provider">
              <ProviderDashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleRoute role="admin">
              <AdminDashboard />
            </RoleRoute>
          }
        />

        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;