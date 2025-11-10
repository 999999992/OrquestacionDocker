const express = require('express');
const path = require('path');
const mysql = require('mysql2'); 
const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise(); 


app.use(express.static(path.join(__dirname,'public'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api', (req, res) => {
    res.json({ mensaje: '¡Te mando un saludo desde Express con Docker!'});
});

app.get('/db-status', async (req, res) => {
    try {
        await db.getConnection();
        res.json({ status: 'OK', mensaje: 'Conexion a MySQL exitosa y lista.'});
    } catch (error) {
        console.error('Se encontro un error en la Base de Datos', error); 
        res.status(500).json({ status: 'ERROR', mensaje: 'Uy, se fallo conectar con MySQL', error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); 
});