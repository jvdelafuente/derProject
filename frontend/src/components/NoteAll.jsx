import PropTypes from 'prop-types';
import { userPropTypes, commentPropTypes } from '../utils/customPropTypes';
import "./NoteAll.css";
import NoteHeader from '../components/NoteHeader/NoteHeader';
import NoteBody from '../components/NoteBody/NoteBody';
import NoteFooter from '../components/NoteFooter/NoteFooter';
import { useState } from 'react';
import { deleteCommentService } from '../services/notesService';

// import { createCommentService } from '../services/notesService'; // Asegúrate de importar tu servicio

const Home = ({ authUser, note, likeNotesById, deleteNotesById, isTrending }) => {
    const [comments, setComments] = useState(note.comments || []);

    const addComment = async (newComment) => {
        setComments([...comments, newComment]);
    };
const handleDeleteComment = async (commentId) => {
    try {
        await deleteCommentService(commentId);
        // Aquí podrías actualizar el estado de comentarios si es necesario
    } catch (err) {
        console.error(err.message);
    }
};
    return (
        <div className="note">
            <NoteHeader
                user_id={note.user_id}
                username={note.username}
                avatar={note.avatar}
                created_at={note.created_at}
            />
            <NoteBody 
                text={note.text}
                url={note.url}
                title={note.title}
                image={note.image}
            />
            <NoteFooter
                username={note.username}
                authUser={authUser}
                noteId={note.id}
                owner={note.owner}
                votes={note.votes}
                likedByMe={note.likedByMe}
                likeNotesById={likeNotesById}
                deleteNotesById={deleteNotesById}
                isTrending={isTrending}
                comments={comments}
                addComment={addComment} // Pasamos la función para agregar comentarios
                deleteComment={handleDeleteComment}
            />
        </div>
    );
};

Home.propTypes = {
    authUser: userPropTypes,
    note: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        url: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        username: PropTypes.string.isRequired,
        owner: PropTypes.bool.isRequired,
        votes: PropTypes.number.isRequired,
        likedByMe: PropTypes.bool.isRequired,
        user_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        isTrending: PropTypes.bool.isRequired,
        comments: PropTypes.arrayOf(commentPropTypes)
    }).isRequired,
    likeNotesById: PropTypes.func.isRequired,
    deleteNotesById: PropTypes.func.isRequired,
    isTrending: PropTypes.bool.isRequired,
};

export default Home;
