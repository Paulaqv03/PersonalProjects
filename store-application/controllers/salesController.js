const db = require('../database/conecction');

class SalesController{
  constructor(){}

  consultar(req, res){
    try {
      db.query(`SELECT * FROM ventas;`, (err, rows) => {
        if(err){
          res.status(400).send(err);
        }
        res.status(200).json(rows);
      })
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  crear(req, res){
    try {
      const {id_producto, cantidad, total, fecha} = req.body;
      db.query(`INSERT INTO ventas 
          (id, id_producto, cantidad, total, fecha) 
          VALUES (NULL, ?, ?, ?, ?);`, 
          [id_producto, cantidad, total, fecha], (err, rows) =>{
            if(err){
              res.status(400).send(err);
            }
            res.status(201).json({id: rows.insertId});
          })
    } catch (err) {
      res.status(500).send(err); 
    }
  }

  actualizar(req, res){
    const {id} = req.params;
    try{
      const {id_producto, cantidad, total, fecha} = req.body;
      db.query(`UPDATE ventas 
        SET id_producto = ?, cantidad = ?, total = ?, fecha = ? WHERE id = ?`, [id_producto, cantidad, total, fecha, id], (err, rows) => {
          if(err){
            res.status(400).send(err);
          }
          if(rows.affectedRows ==1)
            res.status(201).json({respuesta: "Venta actualizada"})
        })
    }catch(err){
      res.status(500).send(err.message)
    }
  }

  borrar(req, res){
    const {id} = req.params;
    try{
      db.query(`DELETE FROM ventas WHERE id = ?`, [id], (err, rows) => {
        if(err){
          res.status(400).send(err);
        }
        if(rows.affectedRows == 1)
          res.status(200).json({repuesta: "Venta eliminada con exito"});
      })
    }catch(err){
      res.status(500).send(err.message);
    }
  }

  consultarId(req, res){
    const {id} = req.params;
    try {
      db.query(`SELECT * FROM ventas WHERE id = ?`, [id], (err, rows) =>{
        if(err){
          res.status(400).send(err);
        }
        res.status(200).send(rows);
      })
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new SalesController();