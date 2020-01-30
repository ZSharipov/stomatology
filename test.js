var express = require("express");
var app = express();
const cors = require('cors');
const fs = require('fs');
app.use(cors());

app.post('/file/:id/:myFile', function(req, res) {
    const filePath = `./client/public/images/${req.params.id}/${req.params.myFile}`;
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

app.listen(3333, function() {
    console.log("Working on port");
});