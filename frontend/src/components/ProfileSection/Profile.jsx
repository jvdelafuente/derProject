import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNotes } from '../../hooks/useNotes';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton } from '@mui/material';
import NoteAll from '../NoteAll';
import defaultAvatar from '../../../src/img/jpg/usuario.png';
import UpdateProfileForm from '../../forms/UpdateProfileForm';
import FollowModal from './FollowModal';
import { getBioService, updateBioService } from '../../services/authService';
import myVideo from '../../../src/img/animated-bg.mp4'

import './Profile.css';
import '../../pages/UpdateProfilePage.css';

const baseURL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
    const { authUser, followersCount, followingCount, followersList, followingList, authUpdateAvatar, authUpdateProfile, loading, setAuthUser } = useAuth();
    const { notes = [] } = useNotes();
    const userNotes = notes.filter(note => note.user_id === authUser?.id);
    const [bio, setBio] = useState('');
    const [editBio, setEditBio] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [bioInput, setBioInput] = useState('');

    useEffect(() => {
        const fetchBio = async () => {
            try {
                if (authUser?.id) {
                    const userBio = await getBioService(authUser.id);
                    setBio(userBio);
                }
            } catch (error) {
                console.error('Error fetching bio:', error);
            }
        };

        fetchBio();
    }, [authUser]);

    const handleModalOpen = (type) => {
        if (type === 'followers') {
            setModalContent(followersList);
            setModalTitle('Followers');
        } else if (type === 'following') {
            setModalContent(followingList);
            setModalTitle('Following');
        }
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleButtonClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const handleAvatarClick = () => {
        document.getElementById('avatarInput').click();
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const confirmed = window.confirm("¿Estás seguro de que quieres cambiar el avatar?");
            if (confirmed) {
                try {
                    await authUpdateAvatar(authUser.id, file);
                    // Actualizar el estado del usuario aquí
                    setAuthUser((prevUser) => ({ ...prevUser, avatar: URL.createObjectURL(file) }));
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log("Cambio de avatar cancelado.");
            }
        }
    };

    const handleBioEdit = () => {
        setEditBio(true);
        setBioInput(bio);
    };

    const handleBioChange = (event) => {
        setBioInput(event.target.value);
    };

    const handleBioSave = async () => {
        try {
            await updateBioService(authUser.id, bioInput);
            setBio(bioInput);
            setEditBio(false);
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    const handleBioCancel = () => {
        setEditBio(false);
        setBioInput(bio);
    };

    return (
        <main className="profileContainer">
            <IconButton disableRipple className="editProfile-button" onClick={handleButtonClick}>
                <ManageAccountsIcon className='edit-icon'/>
            </IconButton>
            {showUpdateForm ? (
                <div className="profileEditContainer">
                    <UpdateProfileForm
                        authUpdateProfile={authUpdateProfile}
                        user_id={authUser?.id}
                        setShowUpdateForm={setShowUpdateForm}
                        loading={loading}
                        setAuthUser={setAuthUser} // Pasar la función para actualizar el estado del usuario
                    />
                </div>
            ) : (
                <>
                <div className="profileAvatar">
                <video className='animated-bg-profile' autoPlay muted loop>
                <source src={myVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

                    <img onClick={handleAvatarClick} src={authUser?.avatar ? `${baseURL}/uploads/${authUser.avatar}` : defaultAvatar} alt="Avatar" />
                </div>
                <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                />
                <div className="profileUserInfo">
                    <h2>{authUser?.username}</h2>
                    <h3>Email: {authUser?.email}</h3>
                    {editBio ? (
                        <div className="edit-bio-container">
                            <textarea
                                value={bioInput}
                                onChange={handleBioChange}
                                rows="4"
                                cols="50"
                            />
                            <div className="bio-buttons">
                                <button className='button' onClick={handleBioSave}>Guardar</button>
                                <button className='button' onClick={handleBioCancel}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <div className="bio-container">
                            <p>Bio: {bio || 'No bio available'}</p>
                            <button className='button' onClick={handleBioEdit}>Editar Bio</button>
                        </div>
                    )}
                    <p>
                        <a className='profile-follow-counts' href="#" onClick={() => handleModalOpen('followers')}><strong>Followers:</strong> {followersCount || 0}</a>
                    </p>
                    <p>
                        <a className='profile-follow-counts' href="#" onClick={() => handleModalOpen('following')}><strong>Following:</strong> {followingCount || 0}</a>
                    </p>
                </div>
                </>
            )}
            {isModalOpen && (
                <FollowModal title={modalTitle} onClose={handleModalClose}>
                    {modalContent.map(user => (
                        <div key={user.id} className="modalUser">
                            <img src={user.avatar ? `${baseURL}/uploads/${user.avatar}` : defaultAvatar} alt="Avatar" className="modalAvatar" />
                            <p>{user.username}</p>
                        </div>
                    ))}
                </FollowModal>
            )}
            <div className="profilePosts">
                <h3>Posts:</h3>
                {userNotes.length > 0 ? (
                    notes.map(note => (
                        <NoteAll
                            key={note.id}
                            authUser={authUser}
                            note={note}
                        />
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </main>
    );
};

export default ProfilePage;
