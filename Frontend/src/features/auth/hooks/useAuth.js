import { useDispatch, useSelector } from "react-redux";

import {
  setUser,
  logout,
  setLoading,
  setAuthChecked,
} from "../../../redux/slices/authSlice";

import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../services/auth.api";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isAuthChecked } = useSelector((state) => state.auth);

  // Register
  const register = async ({ username, email, password }) => {
    try {
      dispatch(setLoading(true));

      const data = await registerUser({
        username,
        email,
        password,
      });

      dispatch(setUser(data.user));
      return true;
    } catch (err) {
      console.log(err);

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Login
  const login = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));

      const data = await loginUser({
        email,
        password,
      });

      dispatch(setUser(data.user));
      return true;
    } catch (err) {
      console.log(err);

      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Logout
  const logoutHandler = async () => {
    try {
      await logoutUser();

      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  // Get Me
  const fetchMe = async () => {
    try {
      dispatch(setLoading(true));

      const data = await getMe();

      if (data?.user) {
        dispatch(setUser(data.user));
      }
    } catch (err) {
      console.log(err);

      dispatch(logout());
    } finally {
      dispatch(setAuthChecked(true));
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isLoading,
    isAuthChecked,
    register,
    login,
    logoutHandler,
    fetchMe,
  };
};

export default useAuth;
