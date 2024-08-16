import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../pages/UpdateProfilePage.css";

const UpdateProfileForm = ({
  authUpdateProfile,
  user_id,
  setShowUpdateForm,
  loading,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las nuevas contraseñas no coinciden", {
        position: "top-center",
      });
      return;
    }

    try {
      // Espera a que authUpdateProfile complete su ejecución
      await authUpdateProfile(user_id, username, email, password);

      // Mostrar mensaje de éxito después de la actualización
      toast.success("Perfil actualizado con éxito, quiza necesite actualizar para ver los cambios.", {
        position: "top-center",
      });

      // Cierra el formulario de actualización
      setShowUpdateForm(false);

      // Limpia los campos de contraseña después de la actualización
      setPassword("");
      setConfirmPassword("");
      setCurrentPasswordInput("");

    } catch (error) {
      // Manejo de errores en caso de que la actualización falle
      toast.error("Hubo un error al actualizar el perfil. Por favor, inténtelo de nuevo.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <form className="update-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nuevo nombre de usuario</label>
            <input
              className="edit-profile-input"
              value={username}
              name="name"
              onChange={(e) => setUsername(e.target.value)}
              id="name"
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Nuevo correo electrónico</label>
            <input
              className="edit-profile-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="tucorreo@gmail.com"
              id="email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="currentPassword">Contraseña actual</label>
            <div className="password-input-container">
              <input
                className="edit-profile-input"
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                type={showCurrentPassword ? "text" : "password"}
                placeholder="********"
                id="currentPassword"
                name="currentPassword"
              />
              <button
                type="button"
                onClick={toggleShowCurrentPassword}
                className="password-toggle-button"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Nueva contraseña</label>
            <div className="password-input-container">
              <input
                className="edit-profile-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                id="password"
                name="password"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="password-toggle-button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Repite la nueva contraseña</label>
            <div className="password-input-container">
              <input
                className="edit-profile-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="password-toggle-button"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button className="editprofile-button-success" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>

    </>
  );
};

UpdateProfileForm.propTypes = {
  authUpdateProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user_id: PropTypes.string.isRequired,
  setShowUpdateForm: PropTypes.func.isRequired,
};

export default UpdateProfileForm;
