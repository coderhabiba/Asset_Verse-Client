import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Navigate } from "react-router";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'employee') {
    return <Navigate to="/hr-dashboard" replace />;
  }

  return children;
};

export default EmployeeRoute;
