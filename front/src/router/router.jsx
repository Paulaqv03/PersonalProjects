// router.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import Dashboard from '../components/user/dashboarduser';
import Dashboardd from '../components/company/dashboardcompany';
import PrivateRoute from './routes/privatereoute';
import Empresa from '../components/company/empresa';
import Usuario from '../components/user/usuario';
const Router = () => {
    return (
        <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<HomePage />} />  {/* Página inicial que muestra los trabajos */}

            {/* Rutas de login y registro */}
            <Route path="/usuario" element={<Usuario />} /> 

            <Route path="/empresa" element={<Empresa />} />

            {/* Rutas para las vistas de usuario y empresa protegidas */}
            <Route path="/dashboarduser" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/dashboardcompany" element={<PrivateRoute element={<Dashboardd />} />} />
            
        </Routes>
    );
};

export default Router;
