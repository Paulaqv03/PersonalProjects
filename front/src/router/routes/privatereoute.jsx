// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    // Verificar si el token existe en el localStorage
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir al login
    if (!token) {
        return <Navigate to="/" />;
    }

    // Si hay token, mostrar el componente de la ruta
    return element;
};

export default PrivateRoute;
