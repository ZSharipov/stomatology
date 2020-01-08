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

// db.on('error', function() { mySql() });


app.get('/doctors', (req, res) => {
    db.query('SELECT * FROM doctors', (err, result) => {
        if (err) {
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
app.get('/patients', (req, res) => {
    db.query('SELECT `patients`.`id`,`fio`,DATE_FORMAT(`birth_day`, "%d-%m-%Y") AS `birth_day`,`address`,`tel`,`hbs`,`hcv`,`hiv`,`date_created`,`date_edit` FROM patients', (err, result) => {
        if (err) {
            console.error("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});

app.post('/journal', function(req, res) {
    db.query(`INSERT INTO journal set ?`, req.body, (err) => {
        if (err) {
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Data successfully inserted!',
        });
    });
});

app.put('/patients', function(req, res) {
    db.query('UPDATE `patients` SET `fio` = ?, `birth_day`=?, `address` = ?,`tel` = ?,`hbs` = ?, `hcv` =?, `hiv` = ? WHERE `id` = ?', [req.body.fio, "2020/1/1", req.body.address, req.body.tel, req.body.hbs, req.body.hcv, req.body.hiv, req.body.id],
        (err, results, fields) => {
            if (err) {
                res.send("возникла ошибка при обновление");
                return
            }

            res.send({
                status: 'Data successfully updated!',
            });
        });
});





app.listen(3210, () => {
    console.log('Server active in port 3210')
});







// db.getConnection(function(err, connection) {
//     if (err) throw err; // not connected!
//     connection.on('error', function() {});
//     app.get('/doctors', (req, res) => {
//         connection.query('SELECT * FROM doctors', (err, result) => {
//             if (err) {
//                 res.send(err);
//                 return
//             } else {
//                 res.send(result);
//             }
//         });
//     });
//     app.get('/patients', (req, res) => {
//         connection.query('SELECT `patients`.`id`,`fio`,DATE_FORMAT(`birth_day`, "%d-%m-%Y") AS `birth_day`,`address`,`tel`,`hbs`,`hcv`,`hiv`,`date_created`,`date_edit` FROM patients', (err, result) => {
//             if (err) {
//                 res.send(err);
//                 return
//             } else {
//                 res.send(result);
//             }
//         });
//     });

//     app.post('/journal', function(req, res) {
//         connection.query(`INSERT INTO journal set ?`, req.body, (err) => {
//             if (err) {
//                 res.send(err);
//                 return
//             }

//             res.send({
//                 status: 'Data successfully inserted!',
//             });
//         });
//     });

//     app.put('/patients', function(req, res) {
//         connection.query('UPDATE `patients` SET `fio` = ?, `birth_day`=?, `address` = ?,`tel` = ?,`hbs` = ?, `hcv` =?, `hiv` = ? WHERE `id` = ?', [req.body.fio, req.body.address, "2020-02-02", req.body.tel, req.body.hbs, req.body.hcv, req.body.hiv, req.body.id],
//             (err, results, fields) => {
//                 if (err) {
//                     res.send(err);
//                     return
//                 }
//                 res.send({
//                     status: 'Data successfully updated!',
//                 });
//             });
//     });

// });