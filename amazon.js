console.log('Loading Amazon');

require('./replaceAll');
var system = require('system');
var page = require('webpage').create();
//para ver en el método value los mensajes
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

//Es obligatorio pasarle como parámetro la consulta que quieres hacer
if(system.args.length>1){
    var query = system.args[1].replaceAll(" ", "+");
    var url = 'https://www.amazon.es/s/ref=nb_sb_noss_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords='+query;
    page.open(url, function (status) {
        if(status === 'success'){
            var json = page.evaluate(function() {
                var produkts = document.getElementsByClassName('s-item-container');
                var gjson = '{ "produkts" : [';
                for(var i=0; i<produkts.length;i++){
                    gjson += '{';
                    var titulo = produkts[i].getElementsByTagName('h2')[0].textContent;
                    var precio = produkts[i].getElementsByClassName('a-color-price')[0].textContent;
                    var link = produkts[i].getElementsByClassName('a-link-normal')[0].getAttribute("href"); 
                    var img = produkts[i].getElementsByClassName('s-access-image')[0].getAttribute("src"); 
                    //generar el json
                    gjson += '"title": "'+titulo.trim()+'", ';
                    gjson += '"price": "'+precio.trim()+'", ';
                    gjson += '"link": "'+link.trim()+'", ';
                    gjson += '"img": "'+img.trim()+'"';
                    gjson += '}';
                    //añadir la coma, menos en la última iteracción
                    if(i<produkts.length-1){
                        gjson += ',';
                    }
                }
                gjson += ']}';
                //Devolver el json
                return gjson;
            });
            console.log(json);
        }else{
            console.log('La página no ha cargado correctamente.');
        }
        phantom.exit();
    });

};


