const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();// Ajusta según la ubicación de tu cliente Prisma

// Función para obtener todos los trabajos
const getAllJobs = async () => {
    return await prisma.job.findMany(); // Esto obtiene todos los trabajos disponibles
};

// Función para obtener un trabajo por su ID
const getJobById = async (jobId) => {
    return await prisma.job.findUnique({
        where: { id: parseInt(jobId) },
    });
};

// Función para verificar si el usuario ya aplicó a un trabajo
const checkExistingApplication = async (jobId, userId) => {
    return await prisma.solicitud.findFirst({
        where: {
            jobId: parseInt(jobId),
            userId: userId,
        },
    });
};

// Función para crear una nueva solicitud de trabajo
const createApplication = async (jobId, userId) => {
    return await prisma.solicitud.create({
        data: {
            jobId: parseInt(jobId),
            userId: userId,
        },
    });
};

const createJob = async (data) => {
    return await prisma.job.create({
        data: {
            ...data,
        },
    });
};

// Función para obtener las solicitudes de un trabajo
const getApplicationsForJob = async (jobId) => {
    return await prisma.solicitud.findMany({
        where: {
            jobId: parseInt(jobId),  // Filtrar por jobId
        },
        include: {
            user: {
                select: {
                    id: true,
                    correoElectronico: true,
                    primerNombre: true,
                    // Puedes agregar más campos del usuario que quieras mostrar
                },
            },
        },
    });
};

module.exports = {
    getAllJobs,
    getJobById,
    checkExistingApplication,
    createApplication,
    createJob,
    getApplicationsForJob 
};

