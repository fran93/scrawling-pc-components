var express = require('express');
var util = require('util');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/searchAmazon', function(req, res, next){
    scrawlingComponents('amazon', req.body.keyword, function(json){
        res.json(json);
    });
});

router.post('/searchPc', function(req, res, next){
    scrawlingComponents('pcomponentes', req.body.keyword, function(json){
        res.json(json);
    });
});

router.post('/searchCool', function(req, res, next){
    scrawlingComponents('coolmod', req.body.keyword, function(json){
        res.json(json);
    });
});

module.exports = router;


function scrawlingComponents(webpage, keyword, callback){
    var spawn = require('child_process').spawn;
    var ls = spawn('./phantomjs', [webpage+'.js', keyword]);
    var json =  null;

    ls.stdout.on('data', (data) => {
        try{
            json = JSON.parse(data+'');
        } catch (e) {
            //No guardar los objetos que no sean JSON
        }
    });

    ls.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`${webpage}: child process exited with code ${code}`);
      callback(json);
    });
};
