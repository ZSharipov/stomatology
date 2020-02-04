var express = require("express");
var multer = require('multer');
var app = express();
var mkdirp = require('mkdirp')
var path = require('path');
const cors = require('cors');
const fs = require('fs');
app.use(cors());



const getStorage = (dirName, myFileName) => {
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            mkdirp(`./client/build/images/${dirName}`, function(err) {
                if (err) {
                    console.log(err.stack)
                } else {
                    callback(null, `./client/build/images/${dirName}`);
                }
            })
        },
        filename: function(req, file, callback) {
            callback(null, myFileName);
        }
    });

    return storage;

}

app.post('/file/:id/:myFile', function(req, res) {
    var upload = multer({
        storage: getStorage(req.params.id, req.params.myFile),

        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname).toLowerCase();
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function(err) {
        if (err) {
            res.end("Error uploading file.");
        }
        res.end('file uploaded');
    });
});

app.post('/file/del/:id/:myFile', function(req, res) {
    const filePath = `./client/build/images/${req.params.id}/${req.params.myFile}`;
    fs.unlink(filePath, function(err) {
        if (err && err.code == 'ENOENT') {
            // file doens't exist
            res.send("File doesn't exist, won't remove it.");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            res.send("Error occurred while trying to remove file");
        } else {
            res.send('removed');
        }
    });
});

app.listen(3211, function() {
    console.log("Working on port 3211");
});