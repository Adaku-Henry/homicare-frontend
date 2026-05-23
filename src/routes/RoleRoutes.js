import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;
  if (!user) return <Navigate to="/" />;
  if (user.role !== role) return <h2>Unauthorized</h2>;

  return children;
};

export default RoleRoute;