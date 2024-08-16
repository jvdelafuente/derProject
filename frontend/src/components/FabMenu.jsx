import "./FabMenu.css";
import { useState } from "react";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import { IconButton } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import useUnreadNotifications from '../hooks/useUnreadNotifications'; // Asegúrate de que la ruta sea correcta

const baseURL = import.meta.env.VITE_API_URL;
import PropTypes from 'prop-types';
import { userPropTypes } from '../utils/customPropTypes';
import { useAuth } from '../hooks/useAuth';
import defaultAvatar from '../../src/img/jpg/usuario.png';

const SideNav = ({ setSearchParams, avatar }) => {
    const avatarImage = avatar ? `${baseURL}/uploads/${avatar}` : defaultAvatar;
    const { authUser, authLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const hasUnreadNotifications = useUnreadNotifications(); // Utiliza el hook aquí

    const toggleNavigation = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div
                onClick={toggleNavigation}
                className={`burger ${isOpen ? "active" : ""}`}
            >
                {authUser && (
                    <img className="FabMenu-avatar" src={avatarImage} alt='Foto de perfil' />
                )}
            </div>
            <nav className={`navigation ${isOpen ? "open" : ""}`}>
                <a id="icon1" className="icon-all" href="/notes">
                    <IconButton>
                        <RoofingOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <span className="tooltip">Home</span>
                </a>
                <a id="icon2" className="icon-all" href="/users/profile">
                    <IconButton>
                        <PermIdentityOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <span className="tooltip">Profile</span>
                </a>
                <a id="icon3" className="icon-all" href="/projects">
                    <IconButton>
                        <MessageOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <span className="tooltip">Messages</span>
                </a>
                <a id="icon4" className="icon-all" href="/notifications">
                    <IconButton>
                        <NotificationsActiveOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                    {hasUnreadNotifications && <div className="notification-badge" />}
                    <span className="tooltip">Notifications</span>
                </a>
                <a id="icon5" className="icon-all" href="/about">
                    <IconButton>
                        <BarChartIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <span className="tooltip">Analytics</span>
                </a>
                <a id="icon6" className="icon-all" href="/users/login">
                    <IconButton onClick={() => authLogout()}>
                        <LogoutOutlinedIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <span className="tooltip">Logout</span>
                </a>
            </nav>
        </>
    );
};

SideNav.propTypes = {
    authUser: userPropTypes,
    setSearchParams: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
};

export default SideNav;
