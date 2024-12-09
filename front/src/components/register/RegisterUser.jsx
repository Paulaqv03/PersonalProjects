// components/register/RegisterUser.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const RegisterUser = ({ onClose }) => {
    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/register/user', formData);
            console.log('Usuario registrado');
        } catch (error) {
            console.error('Error al registrar el usuario', error);
        }
    };

    return (
        <div className="">
            
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-6 items-center"
                >
                    <input
                        type="text"
                        name="primerNombre"
                        placeholder="Primer nombre"
                        value={formData.primerNombre}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="segundoNombre"
                        placeholder="Segundo nombre"
                        value={formData.segundoNombre}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                    />
                    <input
                        type="text"
                        name="primerApellido"
                        placeholder="Primer apellido"
                        value={formData.primerApellido}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="segundoApellido"
                        placeholder="Segundo apellido"
                        value={formData.segundoApellido}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                    />
                    <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                        required
                    >
                        <option value="">Seleccione el tipo de documento</option>
                        <option value="RC">Registro civil</option>
                        <option value="CC">Cédula de ciudadanía</option>
                        <option value="CE">Cédula de extranjería</option>
                        <option value="NIT">NIT</option>
                        <option value="PEP">Permiso especial de permanencia</option>
                    </select>
                    <input
                        type="text"
                        name="numeroDocumento"
                        placeholder="Número de documento"
                        value={formData.numeroDocumento}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="border rounded-lg px-4 py-2"
                        required
                    />
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

RegisterUser.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default RegisterUser;
