const jobModel = require('../models/jobModel'); // Importar el modelo
const jwt = require('jsonwebtoken');

// Función para obtener todas las ofertas de trabajo
const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.getAllJobs();
        return res.status(200).json(jobs);
    } catch (error) {
        console.error('Error al obtener los trabajos:', error);
        return res.status(500).json({ message: 'Error al obtener los trabajos.' });
    }
};

// Función para aplicar a un trabajo
const applyToJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id; // El ID del usuario se obtiene desde el middleware

    try {
        // Verificar si el trabajo existe
        const job = await jobModel.getJobById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Trabajo no encontrado.' });
        }

        // Verificar si la solicitud ya fue hecha
        const existingApplication = await jobModel.checkExistingApplication(jobId, userId);

        if (existingApplication) {
            return res.status(400).json({ message: 'Ya has aplicado a este trabajo.' });
        }

        // Crear una nueva solicitud
        const newApplication = await jobModel.createApplication(jobId, userId);

        return res.status(201).json({ message: 'Aplicación enviada correctamente', application: newApplication });
    } catch (error) {
        console.error('Error al aplicar al trabajo:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud.' });
    }
};

// Función para crear un trabajo
const createJob = async (req, res) => {
    const { title, description, company, location } = req.body;

    // Validaciones simples para asegurarse de que los campos requeridos estén presentes
    if (!title || !description || !company || !location) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Crear el trabajo
        const newJob = await jobModel.createJob({
            title,
            description,
            company,
            location
        });

        return res.status(201).json({ message: 'Trabajo creado exitosamente', job: newJob });
    } catch (error) {
        console.error('Error al crear el trabajo:', error);
        return res.status(500).json({ message: 'Error al crear el trabajo.' });
    }
};


const getApplicationsForJob = async (req, res) => {
    const { jobId } = req.params;  // Obtén el jobId de los parámetros de la ruta

    try {
        // Obtener las solicitudes asociadas al trabajo (con los datos del usuario)
        const applications = await jobModel.getApplicationsForJob(jobId);

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No hay solicitudes para este trabajo.' });
        }

        return res.status(200).json({ applications });
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        return res.status(500).json({ message: 'Error al procesar la solicitud.' });
    }
};


module.exports = {
    getAllJobs,
    applyToJob,
    createJob,
    getApplicationsForJob 

};
