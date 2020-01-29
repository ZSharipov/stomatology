const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');



//#region for img loader


//#endregion



app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Javac#14',
    database: 'stomatology'
});

// db.connect();

// db.on('error', function() { mySql() });


app.get('/doctors', (req, res) => {
    db.query('SELECT * FROM doctors', (err, result) => {
        if (err) {
            console.error(err);
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
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
app.get('/image/:id', function(req, res) {
    db.query(`SELECT url FROM image_url WHERE id_journal=?`, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        }
        res.send(result);
    });
});

app.get('/journal/:id', function(req, res) {
    db.query(`SELECT j.id, j.id_doctor, d.fio doc_fio, j.id_patient, p.fio pat_fio,DATE_FORMAT(p.birth_day, "%d-%m-%Y") AS birth_day ,p.address,p.tel,  j.note, j.date_created, j.date_edit, j.date_done, 
    if(p.hbs = 0,'-','+') as hbs,
    if( p.hcv = 0,'-','+') as hcv,
    if(p.hiv = 0,'-','+') as hiv,
    if(j.is_deciduous = 0,'Коренной','Молочный') as is_deciduous,
    CASE
        WHEN j.state = 0 
            THEN '(1) В очереди'
        WHEN j.state = 1 
            THEN '(2) Рассматривается'
        WHEN j.state = 2 
            THEN '(3) Выполнено'
        WHEN j.state = 3 
            THEN '(4) Отменено'    
    END AS state
FROM journal j 
LEFT JOIN doctors d on j.id_doctor=d.id
LEFT JOIN patients  p on j.id_patient = p.id WHERE j.id_doctor=?`, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        }
        res.send(result);
    });
});
app.get('/journal', function(req, res) {
    db.query(`SELECT j.id, j.id_doctor, d.fio doc_fio, j.id_patient, p.fio pat_fio,DATE_FORMAT(p.birth_day, "%d-%m-%Y") AS birth_day ,p.address,p.tel,  j.note, j.date_created, j.date_edit, j.date_done, 
        if(p.hbs = 0,'-','+') as hbs,
        if( p.hcv = 0,'-','+') as hcv,
        if(p.hiv = 0,'-','+') as hiv,
        if(j.is_deciduous = 0,'Коренной','Молочный') as is_deciduous,
        CASE
            WHEN j.state = 0 
                THEN '(1) В очереди'
            WHEN j.state = 1 
                THEN '(2) Рассматривается'
            WHEN j.state = 2 
                THEN '(3) Выполнено'
            WHEN j.state = 3 
                THEN '(4) Отменено'    
        END AS state
    FROM journal j 
    LEFT JOIN doctors d on j.id_doctor=d.id
    LEFT JOIN patients  p on j.id_patient = p.id `, (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        }
        res.send(result);
    });
});
app.post('/journal', function(req, res) {
    db.query(`INSERT INTO journal set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Data successfully inserted!',
        });
    });
});
app.post('/image', function(req, res) {
    db.query(`INSERT INTO image_url set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Data successfully inserted!',
        });
    });
});
app.post('/patients', function(req, res) {
    db.query(`INSERT INTO patients set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Data successfully inserted!',
        });
    });
});

app.put('/patients', function(req, res) {
    // db.query('UPDATE `patients` SET `fio` = ?, `birth_day`=?, `address` = ?,`tel` = ?,`hbs` = ?, `hcv` =?, `hiv` = ? WHERE `id` = ?', 
    // [req.body.fio, "2020/1/1", req.body.address, req.body.tel, req.body.hbs, req.body.hcv, req.body.hiv, req.body.id],
    db.query(req.body.query, req.body.params, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при обновление");
            return
        }

        res.send({
            status: 'Data successfully updated!',
        });
    });
});

app.post('/doctors', function(req, res) {
    db.query(`INSERT INTO doctors set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Data successfully inserted!',
        });
    });
});
app.delete('/doctors', function(req, res) {
    db.query('DELETE FROM doctors  WHERE `id` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Data successfully deleted!',
        });
    });
});
app.delete('/patients', function(req, res) {
    db.query('DELETE FROM patients WHERE `id` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Data successfully deleted!',
        });
    });
});
app.delete('/journal', function(req, res) {
    db.query('DELETE FROM journal WHERE `id` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Data successfully deleted!',
        });
    });
});

app.put('/doctors', function(req, res) {
    db.query(req.body.query, req.body.params, (err, results, fields) => {
        if (err) {
            console.error(err);
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