// src/contexts/AuthContext.jsx
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPrivateProfile,
  signInService,
  signUpService,
  updateProfileService,
  updateAvatarService,
} from "../services/authService.js";
import { TOKEN_LOCAL_STORAGE_KEY } from "../utils/constants";
import { getToken } from "../utils/getToken";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchUser = async () => {
    try {
      setLoading(true);
      const body = await getPrivateProfile();
      if (body.status === "error") {
        throw new Error(body.message);
      }
      setAuthUser(body.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const authToken = getToken();
  if (authToken) fetchUser();
}, [isAuthenticated]);


  const authRegister = async (username, email, password) => {
    try {
      setLoading(true);
      const body = await signUpService(username, email, password);
      if (body.status === "error") {
        throw new Error(body.message);
      }
      navigate("/users/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const authLogin = async (email, password) => {
    try {
      setLoading(true);
      const body = await signInService(email, password);
      if (body.status === "error") {
        throw new Error(body.message);
      }
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token);
      setAuthUser(body.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const authLogout = () => {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
    setAuthUser(null);
    setIsAuthenticated(false);
    navigate("/users/login");
  };

  const authUpdateProfile = async (user_id, username, email, password) => {
    try {
      setLoading(true);
      const body = await updateProfileService(user_id, username, email, password);
      if (body.status === "error") {
        throw new Error(body.message);
      }
    setAuthUser((prevAuthUser) => ({
      ...prevAuthUser,
      username: username || prevAuthUser.username,
      email: email || prevAuthUser.email,
    }));
      // Mostrar notificación de éxito
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const authUpdateAvatar = async (user_id, avatar) => {
    try {
      setLoading(true);
      const body = await updateAvatarService(user_id, avatar);
      if (body.status === "error") {
        throw new Error(body.message);
      }
      setAuthUser({
        ...authUser,
        avatar: body.data.avatar, 
      });
      // Mostrar notificación de éxito
      toast.success("Avatar updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isAuthenticated,
        authRegister,
        authLogin,
        authLogout,
        authUpdateProfile,
        authUpdateAvatar,
        loading,
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
