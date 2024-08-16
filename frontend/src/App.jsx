import { Route, Routes } from "react-router-dom"
import { useNotes } from "./hooks/useNotes";
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FabMenu from "./components/FabMenu"
import Home from "./pages/Home";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { useAuth } from './hooks/useAuth';
import AboutUs from "./pages/AboutUs";
import TrendingPage from "./pages/TrendingPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import SideContact from "./components/SideContact";
import NotificationPage from "./pages/NotificationPage";
// Rutas Privadas

// Importamos los prop-types.


const App = () => {
  
  const { authUser } = useAuth(); 
    const { setSearchParams, loading } =
        useNotes();
  return (
    <div className="App">
      <SideContact />
        {authUser && (
        <FabMenu
          setSearchParams={setSearchParams}
          loading={loading}
          avatar={authUser?.avatar}
        />
        )} 
      <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/notes" element={<Home />} />
          <Route path="/notes/trending" element={<TrendingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/users/profile" element={<UpdateProfilePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/users/:user_id" element={<PublicProfilePage />} />
      </Routes>
    </div>
  )
}


export default App;