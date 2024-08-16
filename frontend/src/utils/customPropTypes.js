import PropTypes from 'prop-types';
// import urlPropType from 'url-prop-type';

export const notesPropTypes = PropTypes.shape({
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
});
export const userPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    owner: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
    role: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
});
export const commentPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
});