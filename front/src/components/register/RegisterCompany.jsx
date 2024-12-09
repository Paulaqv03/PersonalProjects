// components/register/RegisterCompany.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RegisterCompany = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        razonSocial: '',
        nit: '',
        sector: '',
        telefono: '',
        nombreEmpresa: '',
        ubicacion: '',
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
            const response = await axios.post('http://localhost:5000/api/auth/register/company', formData);
            console.log('Empresa registrada:', response.data);
        } catch (error) {
            console.error('Error al registrar la empresa', error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 items-center">
                <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Correo electrónico" required className="px-4 py-2 border rounded-lg" />
                <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Contraseña" required className="px-4 py-2 border rounded-lg" />
                <input type="text" name="razonSocial" onChange={handleChange} value={formData.razonSocial} placeholder="Razón Social" required className="px-4 py-2 border rounded-lg" />
                <input type="text" name="nit" onChange={handleChange} value={formData.nit} placeholder="NIT" required className="px-4 py-2 border rounded-lg" />
                <input type="text" name="sector" onChange={handleChange} value={formData.sector} placeholder="Sector" required className="px-4 py-2 border rounded-lg" />
                <input type="text" name="telefono" onChange={handleChange} value={formData.telefono} placeholder="Teléfono" required className="px-4 py-2 border rounded-lg" />
                <input type="text" name="nombreEmpresa" onChange={handleChange} value={formData.nombreEmpresa} placeholder="Nombre de la empresa" required className="px-4 py-2 border rounded-lg" />
                <input type="text" name="ubicacion" onChange={handleChange} value={formData.ubicacion} placeholder="Ubicación" required className="px-4 py-2 border rounded-lg" />
                <button
                    type="submit"
                    className="col-span-2 bg-[#00102D] text-white py-2 px-4 rounded hover:bg-[#00102dd8] mt-4"
                >
                    Registrar
                </button>
            </form>

        </div>
    );
};

export default RegisterCompany;
