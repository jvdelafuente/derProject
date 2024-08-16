// src/components/FollowModal.js
import './FollowModal.css'; // Añade estilos para el modal

const FollowModal = ({ title, children, onClose }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="modalCloseButton" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="modalBody">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FollowModal;
