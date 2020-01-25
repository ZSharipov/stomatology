var express = require("express");
var multer = require('multer');
var app = express();
var mkdirp = require('mkdirp')
var path = require('path');
const cors = require('cors');
app.use(cors());

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        mkdirp('./uploads', function(err) {
            if (err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads');
            }
        })
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/file', function(req, res) {
    var upload = multer({
        storage: storage,

        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3211, function() {
    console.log("Working on port 3211");
});