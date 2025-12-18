import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Navigate } from 'react-router';

const HRRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'hr') {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return children;
};

export default HRRoute;
