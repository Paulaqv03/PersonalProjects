const { response } = require('express');
const db = require('../database/conecction');

class ShoppingController{
  constructor(){}

  consultar(req, res){
    try {
      db.query(`SELECT * FROM productos;`, (err, rows) => {
        if(err){
          res.status(400).send(err);
        }
        res.status(200).json(rows);
      })
    } catch (error) {
      res.status(500).send(err.message);
    }
  }

  crear(req, res){
    try{
      const {nombre, precio, stock} = req.body;
      db.query(`INSERT INTO productos
        (id, nombre, precio, stock)
        VALUES (NULL, ?, ?, ?);`,
      [nombre, precio, stock], (err, rows) =>{
        if(err){
          res.status(400).send(err);
        }
        res.status(201).json({id: rows.insertId});
      })
    }catch(err){
      res.status(500).send(err.message);
    }
  }

  actualizar(req, res){
    const {id} = req.params;
    try{
      const {nombre, precio, stock} = req.body;
      db.query(`UPDATE productos 
          SET nombre = ?, precio = ?, stock = ? WHERE id = ?;`, [nombre, precio, stock, id], (err, rows) => {
            if(err){
              res.status(400).send(err);
            }
            if(rows.affectedRows == 1)
              res.status(201).json({respuesta: "Producto actualizado"});
          })
    }catch(err){
      res.status(500).send(err.message);
    }
  };

  borrar(req, res){
    const {id} = req.params;
    try {
      db.query(`DELETE FROM productos WHERE id = ?;`, [id], (err, rows) => {
        if (err){
          res.status(400).send(err);
        }
        if(rows.affectedRows ==1)
        res.status(200).json({respuesta: "Producto eliminado con exito" })
      })
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  consultarId(req, res){
    const {id} = req.params;
    try {
      db.query(`SELECT * FROM productos WHERE id = ?;`, [id], (err, rows) => {
        if(err){
          res.status(400).send(err);
        }
        res.status(200).send(rows);
      })
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}

module.exports = new ShoppingController();