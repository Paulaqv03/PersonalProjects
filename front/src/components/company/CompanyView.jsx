import React, { useState, useEffect } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 4;

const CompanyView = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
    });

    // Estados para la paginación de "Solicitudes Recibidas"
    const [currentPageApplications, setCurrentPageApplications] = useState(1);

    // Estados para la paginación de "Mis Ofertas"
    const [currentPageJobs, setCurrentPageJobs] = useState(1);

    const fetchApplicationsAndJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const responseJobs = await axios.get(
                "http://localhost:5000/api/jobs",
                config
            );
            const jobsWithApplications = await Promise.all(
                responseJobs.data.map(async (job) => {
                    try {
                        const responseApplications = await axios.get(
                            `http://localhost:5000/api/jobs/${job.id}/applications`,
                            config
                        );
                        return { ...job, applications: responseApplications.data.applications || [] };
                    } catch {
                        return { ...job, applications: [] };
                    }
                })
            );
            setJobs(jobsWithApplications);
        } catch (error) {
            console.error("Error al cargar las solicitudes y trabajos:", error);
        }
    };

    useEffect(() => {
        fetchApplicationsAndJobs();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/jobs/create", formData);
            setJobs([...jobs, response.data]);
        } catch (error) {
            console.error("Error al crear la oferta:", error);
        }
    };

    // Lógica de paginación
    const startIndexApplications = (currentPageApplications - 1) * ITEMS_PER_PAGE;
    const endIndexApplications = startIndexApplications + ITEMS_PER_PAGE;
    const paginatedApplications = jobs.slice(startIndexApplications, endIndexApplications);

    const startIndexJobs = (currentPageJobs - 1) * ITEMS_PER_PAGE;
    const endIndexJobs = startIndexJobs + ITEMS_PER_PAGE;
    const paginatedJobs = jobs.slice(startIndexJobs, endIndexJobs);

    const totalPagesApplications = Math.ceil(jobs.length / ITEMS_PER_PAGE);
    const totalPagesJobs = Math.ceil(jobs.length / ITEMS_PER_PAGE);

    // Funciones independientes para la paginación
    const handleNextPageApplications = () => {
        if (currentPageApplications < totalPagesApplications) {
            setCurrentPageApplications((prev) => prev + 1);
        }
    };

    const handlePrevPageApplications = () => {
        if (currentPageApplications > 1) {
            setCurrentPageApplications((prev) => prev - 1);
        }
    };

    const handleNextPageJobs = () => {
        if (currentPageJobs < totalPagesJobs) {
            setCurrentPageJobs((prev) => prev + 1);
        }
    };

    const handlePrevPageJobs = () => {
        if (currentPageJobs > 1) {
            setCurrentPageJobs((prev) => prev - 1);
        }
    };
    return (
        <div className="flex flex-wrap gap-6 ">
            {/* Columna 1: Solicitudes Recibidas */}
            <div className="w-full md:w-1/4 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold text-[#00102D] mb-4">Solicitudes Recibidas</h3>
                {paginatedApplications.map((job) => (
                    <div key={job.id} className="mb-6">
                        <h4 className="text-lg font-bold text-gray-700">{job.title}</h4>
                        <ul className="mt-2">
                            {job.applications?.map((application) => (
                                <li
                                    key={application.id}
                                    className="mb-4 border border-gray-300 p-4 rounded bg-gray-50"
                                >
                                    <p>
                                        <span className="font-semibold">Usuario:</span> {application.user.correoElectronico}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Fecha de Solicitud:</span> {new Date(application.fecha).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {/* Controles de paginación */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevPageApplications}
                        disabled={currentPageApplications  === 1}
                        className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageApplications  === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPageApplications}
                        disabled={currentPageApplications  === totalPagesApplications}
                        className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageApplications  === totalPagesApplications  ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {/* Columna 2: Crear nueva oferta */}
            <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold text-[#00102D] mb-4">Crear Oferta</h3>
                <form onSubmit={handleCreateJob} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="Nombre de la empresa"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Ubicación"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Crear Oferta
                    </button>
                </form>
            </div>

            {/* Columna 3: Mis Ofertas */}
            <div className="w-full md:w-1/3 bg-white p-4 rounded shadow min-h-[400px]">
                <h3 className="text-xl font-semibold text-[#00102D] mb-4">Mis Ofertas</h3>
                <ul>
                    {paginatedJobs.map((job) => (
                        <li
                            key={job.id}
                            className="mb-4 border border-gray-300 p-4 rounded bg-gray-50"
                        >
                            <h3 className="text-lg font-bold text-gray-700">{job.title}</h3>
                            <p>
                                <span className="font-semibold">Empresa:</span> {job.company}
                            </p>
                            <p>
                                <span className="font-semibold">Ubicación:</span> {job.location}
                            </p>
                            <p>
                                <span className="font-semibold">Descripción:</span> {job.description}
                            </p>
                            <p>
                                <span className="font-semibold">Fecha de Creación:</span>{" "}
                                {new Date(job.fechaCreacion).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
                {/* Controles de paginación */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevPageJobs}
                        disabled={currentPageJobs  === 1}
                        className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageJobs  === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPageJobs}
                        disabled={currentPageJobs  === totalPagesJobs}
                        className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPageJobs  === totalPagesJobs ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyView;
