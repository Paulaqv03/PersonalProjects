const express = require('express');
const cors = require('cors');
const app = express();
const shoppingRoutes = require('./routes/shoppingRoutes');
const usersRoutes = require('./routes/salesRoutes');

app.use(express.json());
app.use(cors());

//Rutas
app.use("/shopping", shoppingRoutes);
app.use("/sales", usersRoutes);

app.listen(6000, ()=>{
  console.log("Servidor activo");
});