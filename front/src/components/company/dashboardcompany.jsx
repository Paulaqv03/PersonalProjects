import React from "react";
import CompanyView from './CompanyView';
import { useNavigate } from 'react-router-dom';

const Dashboardd = () => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir al usuario a la página principal
        navigate.push('/');
    };
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-[#00102D] text-white p-8 flex flex-col">
                <h1 className="text-2xl font-bold mb-8 text-[#E2E8F0] font-serif">
                    <span className="text-yellow-400">U</span>
                    <span className="text-blue-500">D</span>
                    <span className="text-red-500">C</span> dashboard
                </h1>


                <ul className="space-y-6">
                    <li>
                        <a href="#" className="block text-lg hover:text-blue-300 transition-colors">
                            Mis ofertas
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-lg hover:text-blue-300 transition-colors">
                            Trabajos
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block text-lg hover:text-blue-300 transition-colors">
                            Notificaciones
                        </a>
                    </li>
                </ul>

                {/* Cerrar sesión al final */}
                <div className="mt-auto pt-6">
                    <a
                        href="/"
                        onClick={handleLogout}
                        className="block text-lg text-red-500 hover:text-red-400 transition-colors"
                    >
                        Cerrar sesión
                    </a>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="p-8 overflow-y-auto bg-white rounded-lg shadow-lg">



                {/* Aquí agregamos los componentes específicos más adelante */}
                <div className="">
                    <CompanyView />
                    {/* Aquí irán los componentes dinámicos */}
                </div>
            </div>
        </div>
    );
};

export default Dashboardd;
