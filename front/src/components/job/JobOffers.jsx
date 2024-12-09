// components/job/JobOffers.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobOffers = ({ jobs }) => {
    return (
        <div>
            <h2>Ofertas de Trabajo</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.titulo}</h3>
                        <p>{job.descripcion}</p>
                        <Link to={`/login`}>Inicia sesión para aplicar</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobOffers;
