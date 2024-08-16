import { useState } from "react";
import { newNotesService } from "../../services/notesService";
import "./NoteCreateForm.css";

const NoteCreateForm = ({ onNewNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", text);
      formData.append("title", title);
      if (image) {
        formData.append("image", image);
      }

      await newNotesService(formData);

      // Limpiar campos del formulario
      setTitle("");
      setText("");
      setImage(null);
      setImageName("");

      // Notificar al padre sobre el nuevo post
      if (onNewNote) {
        onNewNote();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageName("");
  };

  return (
    <form className="note-create-form" onSubmit={handleCreateNote}>
      <label id="noteCreateLabel" htmlFor="title">Title:</label>
      <input
      className="notecreate-tittle"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="title"
        maxLength="100"
        placeholder="Title..."
        required
      />
      <label id="noteCreateLabel" htmlFor="text">Text:</label>
      <textarea
        className="notecreate-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength="400"
        placeholder="Write a comment..."
        required
      />
      <div className="createNote-footer">
        <div className="load-img-container">

        <label htmlFor="image">Upload file:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          />
        <label htmlFor="image" className="custom-button-upload">
          <p>Search file</p>
        </label>
        {imageName && (
          <div className="image-name-container">
            <p className="image-name">{imageName} <button type="button" onClick={handleRemoveImage}>x</button></p>
          </div>
        )}
        </div>
      <button className="notecreate-button" type="submit" disabled={loading}>
        <p className="uploadbutton-text">Post</p>
      </button>
      </div>
    </form>
  );
};

export default NoteCreateForm;
