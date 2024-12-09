import React from 'react';
import LoginUser from '../login/LoginUser'; // Importa el componente de login
import RegisterUser from '../register/RegisterUser'; // Importa el componente de registro
import Navbar from '../layout/Navbar'; // Importa el navbar
import Footer from "../layout/footer";

const Usuario = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Contenido principal */}
            <div className="container mx-auto flex-grow flex flex-col md:flex-row items-center justify-between px-52 py-6">
                <div className="flex gap-16 w-full max-w-7xl p-0">
                    {/* Componente de Login a la izquierda */}
                    <div className="flex justify-center items-center w-1/2 bg-white p-12 border border-gray-300 shadow-xl rounded-none">
                        <LoginUser />
                    </div>

                    {/* Componente de Registro a la derecha */}
                    <div className="flex justify-center items-center w-1/2 bg-white p-12 border border-gray-300 shadow-xl rounded-none">
                        <RegisterUser />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Usuario;
