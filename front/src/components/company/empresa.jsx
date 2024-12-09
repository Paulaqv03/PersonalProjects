import React from 'react';
import LoginCompany from '../login/LoginCompany';  // Importa el componente de login
import RegisterCompany from '../register/RegisterCompany';  // Importa el componente de registro
import Navbar from "../layout/Navbar";
import Footer from "../layout/footer";

const Empresa = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Contenido principal */}
            <div className="container mx-auto flex-grow flex flex-col md:flex-row items-center justify-between px-52 py-6">
                <div className="flex gap-16 w-full max-w-7xl p-0">
                    {/* Componente de Login a la izquierda */}
                    <div className="flex justify-center items-center w-1/2 bg-white p-12 border border-gray-300 shadow-xl rounded-none">
                        <LoginCompany />
                    </div>

                    {/* Componente de Registro a la derecha */}
                    <div className="flex justify-center items-center w-1/2 bg-white p-12 border border-gray-300 shadow-xl rounded-none">
                        <RegisterCompany />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Empresa;
