import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 2;

const UserView = () => {
    const [jobs, setJobs] = useState([]);
    const [jsonJobs, setJsonJobs] = useState([]);
    const [errorBackend, setErrorBackend] = useState(null);
    const [errorJson, setErrorJson] = useState(null);

    // Estados de paginación
    const [currentPageJobs, setCurrentPageJobs] = useState(1);
    const [currentPageJsonJobs, setCurrentPageJsonJobs] = useState(1);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error al cargar los trabajos desde el backend:', error);
                setErrorBackend('No se pudieron cargar los trabajos desde el backend.');
            }
        };

        const fetchJsonJobs = async () => {
            try {
                const response = await fetch('/jobs/jobt.json');
                const data = await response.json();
                setJsonJobs(data);
            } catch (error) {
                console.error('Error al cargar los trabajos desde el JSON:', error);
                setErrorJson('No se pudieron cargar los trabajos desde el archivo JSON.');
            }
        };

        fetchJobs();
        fetchJsonJobs();
    }, []);

    const handleApply = async (jobId) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/api/jobs/${jobId}/apply`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Aplicación enviada correctamente');
        } catch (error) {
            console.error('Error al aplicar:', error);
            alert('Error al aplicar al trabajo');
        }
    };

    // Función para calcular los trabajos paginados
    const paginate = (items, currentPage) => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return items.slice(startIndex, endIndex);
    };

    const totalPagesJobs = Math.ceil(jobs.length / ITEMS_PER_PAGE);
    const totalPagesJsonJobs = Math.ceil(jsonJobs.length / ITEMS_PER_PAGE);

    const paginatedJobs = paginate(jobs, currentPageJobs);
    const paginatedJsonJobs = paginate(jsonJobs, currentPageJsonJobs);

    const JobList = ({ jobs, onApply, isJson = false }) => (
        <ul className="space-y-6">
            {jobs.map((job) => (
                <li
                    key={job.id}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                    <h3 className="text-xl font-semibold text-[#00102D]">{job.title}</h3>
                    <p><strong>Empresa:</strong> {job.company}</p>
                    <p><strong>Ubicación:</strong> {job.location}</p>
                    <p><strong>Descripción:</strong> {job.description}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(job.fechaCreacion).toLocaleDateString()}</p>
                    {isJson ? (
                        <button
                            onClick={() => alert('Aplicar función no disponible para trabajos del JSON')}
                            className="mt-4 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Aplicar
                        </button>
                    ) : (
                        <button
                            onClick={() => onApply(job.id)}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Aplicar
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-[#00102D] mb-6">Trabajos Disponibles</h2>
            <div className="flex space-x-8">
                {/* Columna 1: Trabajos Backend */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-semibold text-[#00102D] mb-4">Trabajos UDC</h3>
                    <img
                        src="/src/assets/logo.png"
                        alt="Doctor"
                        className="mx-auto"
                    />
                    {errorBackend ? (
                        <p className="text-red-500">{errorBackend}</p>
                    ) : (
                        <>
                            <JobList jobs={paginatedJobs} onApply={handleApply} />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setCurrentPageJobs((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPageJobs === 1}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageJobs === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => setCurrentPageJobs((prev) => Math.min(prev + 1, totalPagesJobs))}
                                    disabled={currentPageJobs === totalPagesJobs}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageJobs === totalPagesJobs ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Columna 2: Trabajos JSON */}
                <div className="w-full md:w-1/2">
                    <img
                        src="/src/assets/elem.png"
                        alt="Doctor"
                        className="mx-auto"
                    />
                    <h3 className="text-xl font-semibold text-[#00102D] mb-4">ELEMPLEO.COM</h3>
                    {errorJson ? (
                        <p className="text-red-500">{errorJson}</p>
                    ) : (
                        <>
                            <JobList jobs={paginatedJsonJobs} isJson={true} />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setCurrentPageJsonJobs((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPageJsonJobs === 1}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageJsonJobs === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => setCurrentPageJsonJobs((prev) => Math.min(prev + 1, totalPagesJsonJobs))}
                                    disabled={currentPageJsonJobs === totalPagesJsonJobs}
                                    className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageJsonJobs === totalPagesJsonJobs ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserView;
