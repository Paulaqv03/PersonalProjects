const userModel = require('../models/userModel');
const userService = require('../services/userServices');

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userService.getById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: err });
    }
};

const create = async (req, res) => {
    const { name, roleID, departmentID, email, dateHired } = req.body;

    try {
        const newUser = { name, roleID, departmentID, email, dateHired };
        const result = await userService.create(newUser);
        res.status(201).json({ message: 'Usuario creado', result });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el usuario', error: err });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
    const { newName, roleID, departmentID, email, dateHired } = req.body;

    const newData = { newName, roleID, departmentID, email, dateHired };

    try {
        const result = await userService.updateById(id, newData);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).json({ message: 'Usuario actualizado', result });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await userService.deleteById(id);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).json({ message: 'Usuario eliminado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};