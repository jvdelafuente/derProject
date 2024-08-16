// src/components/NoteHeader.js
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../public/img/jpg/usuario.png';
import { useAuth } from '../../hooks/useAuth';
import './NoteHeader.css';

const baseURL = import.meta.env.VITE_API_URL;

const NoteHeader = ({ user_id, username, avatar, created_at }) => {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const avatarImage = avatar ? `${baseURL}/uploads/${avatar}` : defaultAvatar;

    const handleUserClick = () => {
        if (authUser?.id === parseInt(user_id)) {
            navigate('/users/profile');
        } else {
            navigate(`/users/${user_id}`);
        }
    };

    return (
        <header className="note-header">
            <div className="note-header-user" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
                <img src={avatarImage} alt="Imagen adjunta al note" />
                <p>@{username}</p>
            </div>
            <time className='created_at'>
                {new Date(created_at).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                })}
            </time>
        </header>
    );
};

NoteHeader.propTypes = {
    user_id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    created_at: PropTypes.string.isRequired,
};

export default NoteHeader;
