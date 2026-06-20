import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const AuthInitializer = ({ children }) => {
  const { fetchMe } = useAuth();

  useEffect(() => {
    fetchMe();
  }, []);

  return children;
};

export default AuthInitializer;
