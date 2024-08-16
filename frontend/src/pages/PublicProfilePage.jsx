import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getPublicUserProfile, getBioService, followUserService, unfollowUserService } from '../services/authService';
import defaultAvatar from '../../src/Img/jpg/usuario.png';
import NoteAll from '../components/NoteAll';
import { useNotes } from '../hooks/useNotes';
import './PublicProfilePage.css';

const baseURL = import.meta.env.VITE_API_URL;

const PublicProfilePage = () => {
    const { user_id } = useParams();
    const { authUser, isAuthenticated } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [bio, setBio] = useState('');  // Agregar estado para la biografía
    const { notes } = useNotes();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const userProfileData = await getPublicUserProfile(user_id);

                if (userProfileData.status === 'ok') {
                    setUser(userProfileData.data.user);

                    // Llamar al servicio para obtener la biografía
                    const fetchedBio = await getBioService(user_id);
                    setBio(fetchedBio);  // Guardar la biografía en el estado

                    if (authUser) {
                        const isUserFollowing = userProfileData.data.user.followers.some(follower => follower.id === authUser.id);
                        setIsFollowing(isUserFollowing);
                    }
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user_id, authUser]);

    const handleFollow = async () => {
        if (isFollowing) return;
        try {
            const response = await followUserService(user_id);
            if (response.status === 'ok') {
                setIsFollowing(true);

            } else {
                console.error('Failed to follow user');
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        if (!isFollowing) return;
        try {
            const response = await unfollowUserService(user_id);
            if (response.status === 'ok') {
                setIsFollowing(false);

            } else {
                console.error('Failed to unfollow user');
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    const userNotes = notes.filter(note => note.user_id === parseInt(user_id));
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <main className="publicProfileContainer">
            <div className="public-profile-header">
                <div className="profilePublicAvatar">
                    <img src={user.avatar ? `${baseURL}/uploads/${user.avatar}` : defaultAvatar} alt="Avatar" />
                </div>
                <div className="profileUserInfo">
                    <h2>{user.username}</h2>
                    <p className='bio-container'>Bio: {bio || 'No bio available'}</p> {/* Mostrar la biografía desde el estado */}
                    {isAuthenticated && authUser?.id !== parseInt(user_id) && (
                        isFollowing ? (
                            <button className='follow-button' onClick={handleUnfollow}>Unfollow</button>
                        ) : (
                            <button className='follow-button' onClick={handleFollow}>Follow</button>
                        )
                    )}
                </div>
            </div>
            <div className="profilePosts">
                <h3>Posts:</h3>
                <ul>
                    {userNotes.length > 0 ? (
                        userNotes.map(note => (
                            <NoteAll
                                key={note.id}
                                authUser={authUser}
                                note={note}
                            />
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </ul>
            </div>
        </main>
    );
};

export default PublicProfilePage;
