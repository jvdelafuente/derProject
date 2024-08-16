import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getToken } from '../utils/getToken';
import defaultAvatar from '../../public/img/jpg/usuario.png';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

import './NotificationPage.css';

const baseURL = import.meta.env.VITE_API_URL;

const NotificationPage = () => {
  const token = getToken();
  const { isAuthenticated } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${baseURL}/notifications`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, token]);

  const handleNotificationClick = async (id) => {
    try {
      await fetch(`${baseURL}/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error marking notification as read', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='notification-container'>
      <h2 className='notification-h1'>Notificaciones</h2>
      <ul className='notification-content'>
        {notifications.map(notification => (
          
          <li
            key={notification.id}
            className='notification-item'
            onClick={() => handleNotificationClick(notification.id)}
          ><div className="notification-user-content">
            <img
              className='notification-avatar'
              src={notification.follower_avatar ? `${baseURL}/uploads/${notification.follower_avatar}` : defaultAvatar}
              alt="Avatar"
            />
            <p className='notification-username'>
              {notification.follower_username ? `${notification.follower_username} te ha seguido` : 'Usuario desconocido te ha seguido'}
            </p>
            <IconButton className='notification-close-button'><CloseIcon sx={{ color: 'white' }}/></IconButton>
          </div></li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
