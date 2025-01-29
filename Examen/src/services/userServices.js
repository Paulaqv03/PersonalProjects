const userModel = require('../models/userModel');

const getAll = async () => {
    const users = await userModel.getAll();
    return users;
};

const getById = async (id) => {
    const user = await userModel.getById(id);
    return user;
};

const create = async (newUser) => {
    const result = await userModel.create(newUser);
    return result;
};

const updateById = async (id, newData) => {
    const result = await userModel.updateById(id, newData);
    return result;
};

const deleteById = async (id) => {
    const result = await userModel.deleteById(id);
    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
