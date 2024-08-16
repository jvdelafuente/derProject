import defaultAvatar from '../../../public/img/jpg/usuario.png';
import PropTypes from 'prop-types';
import { userPropTypes, commentPropTypes } from '../../utils/customPropTypes';
import { useState } from 'react';
import { newVoteService, deleteNotesService, createCommentService } from '../../services/notesService';
import './NoteFooter.css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";

const baseURL = import.meta.env.VITE_API_URL;

const NoteFooter = ({
    avatar,
    authUser,
    noteId,
    owner,
    votes,
    likedByMe,
    likeNotesById,
    deleteNotesById,
    comments,
    addComment,
    deleteComment
}) => {
    const [loading, setLoading] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [error, setError] = useState('');
    const [localComments, setLocalComments] = useState(comments);

    const avatarImage = avatar ? `${baseURL}/${avatar}` : defaultAvatar;

    const handleLikeNotes = async () => {
        try {
            setLoading(true);
            const method = likedByMe ? 'delete' : 'post';
            await newVoteService(noteId, method);
            likeNotesById(noteId);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNotes = async () => {
        if (confirm('¿Deseas eliminar la nota?')) {
            try {
                setLoading(true);
                await deleteNotesService(noteId);
                deleteNotesById(noteId);
            } catch (err) {
                alert(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) {
            setError('');
            return;
        }

        try {
            setLoading(true);
            const newComment = await createCommentService(noteId, commentContent);
            const commentWithUsername = {
                ...newComment,
                username: authUser.username,
                avatar: authUser.avatar
            };
            setLocalComments(prevComments => [commentWithUsername, ...prevComments]);
            addComment(commentWithUsername);
            setCommentContent('');
            setError('');
        } catch (err) {
            setError('Failed to add comment.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (confirm('¿Deseas eliminar este comentario?')) {
            try {
                setLoading(true);
                await deleteComment(commentId);
                setLocalComments(localComments.filter(comment => comment.id !== commentId));
            } catch (err) {
                alert(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <footer className="note-footer">
            <div className="note-footer-upper">
                <div className="comments-section">
                    {localComments && localComments.length > 0 ? (
                        localComments.map(comment => (
                            <div key={comment.id} className="comment">
                                <div className="comment-without-bin">
                                    <div className="comment-header">
                                        <img
                                            className='comment-avatar'
                                            src={avatarImage}
                                            alt="User Avatar"
                                        />
                                        <span className="comment-username">{comment.username}</span>
                                    </div>
                                    <div className="comment-content">
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                                {authUser.id === comment.user_id && (
                                    <IconButton
                                        disableRipple
                                        className="deleteNoteButton"
                                        onClick={() => handleDeleteComment(comment.id)}
                                    >
                                        <DeleteOutlineIcon alt="Delete" />
                                    </IconButton>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                    className="comment-input"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add a comment..."
                />
                <div className="note-footer-footer">
                    <div className='footerDiv'>
                        <IconButton
                            disableRipple
                            className={`heart ${likedByMe && 'like'}`}
                            onClick={() => authUser && !loading && handleLikeNotes()}
                        >
                            {likedByMe ? <StarIcon /> : <StarBorderIcon />}
                            <p className='numberVotes'>{votes}</p>
                        </IconButton>
                    </div>
                    {owner && (
                        <IconButton
                            disableRipple
                            className="deleteNoteButton"
                            onClick={() => handleDeleteNotes()}
                        >
                            <DeleteOutlineIcon alt="Delete" />
                        </IconButton>
                    )}
                    <button className='comment-button' type="submit" disabled={loading}>
                        <IconButton disableRipple className='send-icon'>
                            <SendIcon alt="Send" />
                        </IconButton>
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            </form>
        </footer>
    );
};

NoteFooter.propTypes = {
    authUser: userPropTypes,
    noteId: PropTypes.number.isRequired,
    owner: PropTypes.bool.isRequired,
    votes: PropTypes.number.isRequired,
    likedByMe: PropTypes.bool,
    likeNotesById: PropTypes.func.isRequired,
    deleteNotesById: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(commentPropTypes),
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
};

export default NoteFooter;