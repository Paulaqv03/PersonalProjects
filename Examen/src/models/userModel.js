const connection = require('./connection');

//Obtener todos los usuarios
const getAll = async() => {
    const [Users] = await connection.execute(`SELECT * FROM Users;`);
    return Users;
};

//Obtener usuario por Id
const getById = async(id) => {
    const [Users] = await connection.execute(`SELECT Name WHERE UserID = ?;`, [id]);
    return Users[0];
};

//Actualizar usuario por Id
const updateById = async (id, newData) => {
    const { newName, roleID, departmentID, email, dateHired } = newData;

    const [result] = await connection.execute(`
        UPDATE Users
        SET Name=?, RoleID=?, DepartmentID=?, Email=?, DateHired=?
        WHERE UserID=?;
    `, [newName, roleID, departmentID, email, dateHired, id]);

    return result;
};

//Crear usuario
const create = async (newUser) => {
    const {name, roleID, departmentID, email, dateHired} = newUser;
    const [result] = await connection.execute(`
        INSERT INTO Users (Name, RoleID, DepartmentID, Email, DateHired)
        VALUES (?,?,?,?,?);`, [name, roleID, departmentID, email, dateHired]);

    return result;
};

//Eliminar un usuario por su Id
const deleteById = async (id) => {
    const [result] = await connection.execute(`
        DELETE FROM Users WHERE UserID = ?;`, [id]);

    return result;
};

module.exports = {
    getAll,
    getById,
    updateById,
    create,
    deleteById,
};