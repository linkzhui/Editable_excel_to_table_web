var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var url = require('url');
var xlsx = require('xlsx');
// var mongodb = require('./mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'file_upload' });
});

var fs = require('fs');
var path = require('path');
var url = require('url');
var formidable = require('formidable');
var new_path;
router.post('/',
    function(req, res) {
        // var form = new formidable.IncomingForm();
        // form.parse(req, function (err, fields, files) {
        //     var upload_file = files.fileUpload;
        //     var oldpath = upload_file.path;
        //     var newpath = '/Users/zheminsu/WebstormProjects/untitled/fileDB/' + upload_file.name;
        //     fs.rename(oldpath, newpath, function (err) {
        //         if (err) throw err;
        //         console.log('File saved!');
        //     });
        //     var file_ext = path.extname(url.parse(newpath).pathname);
        //
        //     if (file_ext === '.xls' || file_ext === '.xlsx') {
        //         const Workbook = xlsx.readFile(newpath);
        //         const SheetNames = Workbook.SheetNames;
        //         const Worksheet = Workbook.Sheets[SheetNames[0]];
        //
        //         var result = xlsx.utils.sheet_to_json(Worksheet);
        //         //mongodb.DBInsert(result);
        //         // fs.writeFile('table.htm',result,function(err)
        //         // {
        //         //     if (err) throw err;
        //         // })
        //         console.log(result);
        //     }
        //     // res.setHeader('Content-Type', 'text/html');
        //     // res.writeHead(200, { 'Content-Type': 'text/plain' });
        //     res.end(result);
        //
        // });
        // parse a file upload
        console.log('post successful');
        var form = new formidable.IncomingForm(),files=[],fields=[],docs=[];
        console.log('start upload');

        //存放目录
        form.uploadDir = '/Users/zheminsu/Desktop/test_folder/';

        form.on('field', function(field, value) {
            //console.log(field, value);
            fields.push([field, value]);
        }).on('file', function(field, file) {
            // console.log(field, file);
            files.push([field, file]);
            docs.push(file);


            var types = file.name.split('.');
            var date = new Date();
            var ms = Date.parse(date);
            new_path = "/Users/zheminsu/Desktop/test_folder/"+ms+'_'+file.name;
            fs.renameSync(file.path, new_path);
        }).on('end', function() {
            console.log('-> upload done');
            // res.writeHead(200, {
            //     'content-type': 'text/plain'
            // });
            var out={Resopnse:{
                'result-code':0,
                timeStamp:new Date(),
            },
                files:docs
            };
            // var sout=JSON.stringify(out);
            // res.end(sout);
        });

        form.parse(req, function(err, fields, files) {
            err && console.log('formidabel error : ' + err);
            var file_ext = path.extname(url.parse(new_path).pathname);

            if (file_ext === '.xls' || file_ext === '.xlsx') {
                const Workbook = xlsx.readFile(new_path);
                const SheetNames = Workbook.SheetNames;
                const Worksheet = Workbook.Sheets[SheetNames[0]];

                var result = xlsx.utils.sheet_to_json(Worksheet);
                //mongodb.DBInsert(result);
                // fs.writeFile('table.htm',result,function(err)
                // {
                //     if (err) throw err;
                // })
                console.log(result);
                // res.setHeader('Content-Type', 'text/html');
                // res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.json(result);

            }

        });

    });
module.exports = router;
