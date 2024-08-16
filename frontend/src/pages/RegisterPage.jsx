// Importamos los hooks.
import { useAuth } from '../hooks/useAuth';
import "./RegisterPage.css"
import myVideo from '../../public/img/animated-bg.mp4'

// Importamos los componentes.
import { Navigate } from 'react-router-dom';
import RegisterForm from '../forms/RegisterForm';


const RegisterPage = () => {
    const { authUser, authRegister, loading } = useAuth();

    // Si la persona está autenticada redirigimos a la página principal.
    if (authUser) return <Navigate to="/notes" />;

    return (
        <main className='registerMain'>
            <RegisterForm authRegister={authRegister} loading={loading} />
                        <div className="animated-bg-container-r">
                        <video className='animated-bg' autoPlay muted loop>
                <source src={myVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            </div>

        </main>
    );
};

export default RegisterPage;
