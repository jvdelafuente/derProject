import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getFollowersService, getFollowingService } from '../services/authService';
import { getToken } from '../utils/getToken';

export function useAuth() {
    const context = useContext(AuthContext);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [loading, setLoading] = useState(false);

    // Effecto para obtener datos de seguidores y seguidos al cambiar el usuario autenticado
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (context.authUser) {
                    const { id } = context.authUser;
                    const followersResponse = await getFollowersService(id);
                    const followingResponse = await getFollowingService(id);

                    setFollowersList(followersResponse);
                    setFollowingList(followingResponse);

                    setFollowersCount(followersResponse.length);
                    setFollowingCount(followingResponse.length);
                }
            } catch (err) {
                console.error('Error fetching profile data:', err);
            }
        };

        fetchProfileData();
    }, [context.authUser]);

    // Función para actualizar el avatar del usuario
    const authUpdateAvatar = async (user_id, avatar) => {
        const baseURL = import.meta.env.VITE_API_URL;
        const token = getToken();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('avatar', avatar);

            const response = await fetch(`${baseURL}/users/${user_id}/avatar`, {
                method: 'PUT',
                headers: {
                    'Authorization': token, // Asegúrate de incluir 'Bearer'
                    'Accept': 'application/json',
                },
                body: formData
            });

            const body = await response.json();

            if (!response.ok) {
                throw new Error(body.message || 'Something went wrong');
            }

            context.setAuthUser({
                ...context.authUser,
                avatar: body.avatar, // Asegúrate de que `body.avatar` contenga la URL correcta del nuevo avatar
            });
        } catch (err) {
            console.error('Failed to update avatar:', err);
        } finally {
            setLoading(false);
        }
    };

    // Función para actualizar el perfil del usuario
    const authUpdateProfile = async (user_id, username, email, password) => {
        const baseURL = import.meta.env.VITE_API_URL;
        const token = getToken();

        try {
            setLoading(true);

            const response = await fetch(`${baseURL}/users/${user_id}/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': token, // Asegúrate de incluir 'Bearer'
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const body = await response.json();

            if (!response.ok) {
                throw new Error(body.message || 'Something went wrong');
            }

            context.setAuthUser({
                ...context.authUser,
                username: body.username,
                email: body.email,
                // Nota: La contraseña no se debería actualizar en el frontend
            });
        } catch (err) {
            console.error('Failed to update profile:', err);
        } finally {
            setLoading(false);
        }
    };

    return { 
        ...context, 
        followersCount, 
        followingCount, 
        followersList, 
        followingList, 
        authUpdateAvatar, 
        authUpdateProfile,
        loading 
    };
}
