// Importamos los hooks.
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
// Importamos los componentes.
import { Navigate } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import './RegisterPage.css'
import myVideo from '../../public/img/animated-bg.mp4'

const LoginPage = () => {

    const { authUser, authLogin, loading } = useAuth();
    
    // Si la persona está autenticada redirigimos a la página principal.
    if (authUser) return <Navigate to="/notes" />;

    return (
        <main className='registerMain'>
            <LoginForm authLogin={authLogin} loading={loading} />
            <div className="animated-bg-container-r">
                        <video className='animated-bg' autoPlay muted loop >
                <source src={myVideo} type="video/mp4" />
            </video></div>
        </main>
    );
};
LoginForm.propTypes = {
    authLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default LoginPage;
