// components/login/LoginCompany.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginCompany = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamada a la ruta para el login de empresas
            const response = await axios.post('http://localhost:5000/api/auth/login/company', formData);
            console.log('Inicio de sesión de empresa exitoso', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboardcompany');
        } catch (error) {
            console.error('Error en el inicio de sesión de empresa', error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Inicio sesión</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 items-center">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico de la empresa"
                    required
                    className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                    className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
                />
                <button
                        type="submit"
                        className="col-span-2 bg-[#00102D] text-white py-2 px-4 rounded hover:bg-[#00102dd8] mt-4"
                    >
                        Iniciar sesión
                    </button>
            </form>
        </div>
    );
};

export default LoginCompany;
