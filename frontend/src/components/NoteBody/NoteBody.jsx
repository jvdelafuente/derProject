import PropTypes from "prop-types";
import "./NoteBody.css";
import React from "react";

const baseUrl = 'http://localhost:3000/uploads';

const NoteBody = ({ title, text, image }) => {
  const imageElement = React.useRef(null); // Ref para la imagen
  const lightbox = React.useRef(null); // Ref para la lightbox

  const handleOpenLightbox = () => {
    lightbox.current.style.display = 'flex'; // Muestra el lightbox en modo flex
    lightbox.current.querySelector('img').src = imageElement.current.src;
  };

  const handleCloseLightbox = (event) => {
    if (event.target === lightbox.current || event.target.classList.contains('close')) {
      lightbox.current.style.display = 'none';
    }
  };



  return (
    <div className="note-body">
      <h4 className="card-title">{title}</h4>
      {image && (
        <>
          <img
            ref={imageElement}
            src={`${baseUrl}/${image}`}
            alt={title}
            className="note-image"
            onClick={handleOpenLightbox}
          />
          <div ref={lightbox} className="lightbox" onClick={handleCloseLightbox}>
            <span className="close" onClick={handleCloseLightbox}>
              &times;
            </span>
            <img className="lightbox-image" />
          </div>
        </>
      )}
      <p className="cardText">{text}</p>

    </div>
  );
};

NoteBody.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  image: PropTypes.string,
};

export default NoteBody;
