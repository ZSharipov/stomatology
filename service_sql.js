const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Javac#14',
    database: 'stomatology'
});

db.connect();

app.get('/doctor', function (req, res) {
    db.query('SELECT * FROM doctor', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// app.post('/data', function (req, res) {
//     console.log(req.body);
//     var data = { nama: req.body.nama, usia: req.body.usia };
//     var sql = 'INSERT INTO ninja SET ?';
//     db.query(sql, data, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send({
//             status: 'Data sukses diinput!',
//             no: null,
//             nama: req.body.nama,
//             usia: req.body.usia
//         });
//     });
// });

app.listen(3210, () => {
    console.log('Server active in port 3210')
});