const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/router.js');
const pkj = require("./package.json");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Usar el router principal
app.use('/api', router);

app.get("/", (req, res) => {
    res.json({
        name: pkj.name,
        author: pkj.author,
        version: pkj.version,
        description: pkj.description,
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
