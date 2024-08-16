import { useState, useEffect } from 'react';
import { getToken } from '../utils/getToken'; // Asegúrate de que la ruta sea correcta

const baseURL = import.meta.env.VITE_API_URL;

const useUnreadNotifications = () => {
    const [hasUnread, setHasUnread] = useState(false);

    useEffect(() => {
        const fetchUnreadNotifications = async () => {
            const token = getToken();
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
                setHasUnread(data.length > 0); // O ajusta según tu estructura de datos
            } catch (error) {
                console.error('Error fetching unread notifications', error);
            }
        };

        fetchUnreadNotifications();
    }, []);

    return hasUnread;
};

export default useUnreadNotifications;