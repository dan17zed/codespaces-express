const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configura el middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Formato de los datos a almacenar
    const data = `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}\n\n`;
    
    // Almacenar en el archivo
    fs.appendFile('contact_form_submissions.txt', data, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).send('Error al guardar los datos.');
        }
        res.redirect('/thank_you.html');
    });
});

// Ruta para la página de agradecimiento
app.get('/thank_you.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'thank_you.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});