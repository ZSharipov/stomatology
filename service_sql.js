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


app.get('/aphorism', (req, res) => {
    db.query('SELECT * FROM aphorism', (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
app.get('/anaesthesia', (req, res) => {
    db.query('SELECT * FROM anaesthesia', (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
app.get('/anaesthetization', (req, res) => {
    db.query('SELECT * FROM anaesthetization', (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
app.get('/materials', (req, res) => {
    db.query('SELECT * FROM materials', (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
app.get('/diagnoses', (req, res) => {
    db.query('SELECT * FROM diagnoses', (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});
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
    db.query('SELECT `patients`.`id`,`fio`,DATE_FORMAT(`birth_day`, "%d-%m-%Y") AS `birth_day`,`address`,`tel`,`hbs`,`hcv`,`hiv`,DATE_FORMAT(`date_created`, "%d-%m-%Y") AS `date_created`,`date_edit` FROM patients', (err, result) => {
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
    db.query(`SELECT j.id, j.id_doctor, d.fio doc_fio, j.id_patient, p.fio pat_fio,DATE_FORMAT(p.birth_day, "%d-%m-%Y") AS birth_day ,p.address,p.tel,IFNULL(j.note,'') AS note,   j.date_created, j.date_edit, j.date_done, 
    DATE_FORMAT(p.date_created, "%d-%m-%Y") AS pdate_created, 
    DATE_FORMAT(j.date_created, "%d-%m-%Y") AS jdate_created, 
    DATE_FORMAT(j.date_done, "%d-%m-%Y") AS date_done, 
    p.hbs, p.hcv, p.hiv,if(j.is_deciduous = 0,'Коренной','Молочный') as is_deciduous, j.state as state
    FROM journal j 
    LEFT JOIN doctors d on j.id_doctor=d.id
    LEFT JOIN patients  p on j.id_patient = p.id WHERE j.id_doctor=? order by state, jdate_created`, [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        }
        res.send(result);
    });
});

app.get('/journal', function(req, res) {
    db.query(`SELECT j.id, j.id_doctor, d.fio doc_fio, j.id_patient, p.fio pat_fio,DATE_FORMAT(p.birth_day, "%d-%m-%Y") AS birth_day ,p.address,p.tel,  j.note, 
    DATE_FORMAT(p.date_created, "%d-%m-%Y") AS pdate_created, 
    DATE_FORMAT(j.date_created, "%d-%m-%Y") AS jdate_created,    
    DATE_FORMAT(j.date_done, "%d-%m-%Y") AS date_done, 
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
    LEFT JOIN patients  p on j.id_patient = p.id order by d.fio,state, jdate_created`, (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        }
        res.send(result);
    });
});




//POST's

app.post('/anaesthetization', function(req, res) {
    db.query(`INSERT INTO anaesthetization set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Запись успешно создана!',
        });
    });
});
app.post('/anaesthesia', function(req, res) {
    db.query(`INSERT INTO anaesthesia set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Запись успешно создана!',
        });
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
            status: 'Запись успешно создана!',
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
            status: 'Запись успешно создана!',
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
            status: 'Запись успешно создана!',
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
            status: 'Запись успешно создана!',
        });
    });
});

app.post('/diagnoses', function(req, res) {
    db.query(`INSERT INTO diagnoses set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Запись успешно создана!',
        });
    });
});



//PUT's

app.put('/anaesthetization', function(req, res) {
    db.query(req.body.query, req.body.params, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при обновление");
            return
        }

        res.send({
            status: 'Запись успешно обновлена!',
        });
    });
});
app.put('/anaesthesia', function(req, res) {
    db.query(req.body.query, req.body.params, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при обновление");
            return
        }

        res.send({
            status: 'Запись успешно обновлена!',
        });
    });
});
app.put('/journal', function(req, res) {
    db.query(req.body.query, req.body.params, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при обновление");
            return
        }

        res.send({
            status: 'Запись успешно обновлена!',
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
            status: 'Запись успешно обновлена!',
        });
    });
});

app.put('/diagnoses', function(req, res) {
    db.query(req.body.query, req.body.params, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при обновление");
            return
        }

        res.send({
            status: 'Запись успешно обновлена!',
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
            status: 'Запись успешно обновлена!',
        });
    });
});



//DELETE's

app.delete('/anaesthetization', function(req, res) {
    db.query('DELETE FROM anaesthetization  WHERE `id` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Запись успешно удалена!',
        });
    });
});
app.delete('/anaesthesia', function(req, res) {
    db.query('DELETE FROM anaesthesia  WHERE `id` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Запись успешно удалена!',
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
            status: 'Запись успешно удалена!',
        });
    });
});

app.delete('/diagnoses', function(req, res) {
    db.query('DELETE FROM diagnoses  WHERE `id` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Запись успешно удалена!',
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
            status: 'Запись успешно удалена!',
        });
    });
});
app.delete('/image', function(req, res) {

    db.query('DELETE FROM image_url WHERE `url` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Запись успешно удалена!',
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
            status: 'Запись успешно удалена!',
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