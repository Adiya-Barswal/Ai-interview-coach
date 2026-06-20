import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { user, isLoading, isAuthChecked } = useAuth();

  if (!isAuthChecked || isLoading) {
    return <h1>Loading...</h1>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default Protected;
