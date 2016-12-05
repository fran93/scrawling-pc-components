console.log('Loading Coolmod');

require('./replaceAll');
var system = require('system');
var page = require('webpage').create();
//para ver en el método value los mensajes
/*
page.onConsoleMessage = function(msg) {
  console.log(msg);
};*/

//Es obligatorio pasarle como parámetro la consulta que quieres hacer
if(system.args.length>1){
    var query = system.args[1].replaceAll(" ", "+");
    var url = 'http://www.coolmod.com/component/search/?searchword='+query;
    page.open(url, function (status) {
        if(status === 'success'){
            var json = page.evaluate(function() {
                var produkts = document.getElementsByClassName('produkt');
                var gjson = '{ "produkts" : [';
                for(var i=0; i<produkts.length;i++){
                    gjson += '{';
                    //obtener los datos de la web
                    var spacer = produkts[i].getElementsByClassName('spacer')[0];
                    var titulo = spacer.getElementsByTagName('h2')[0].textContent;
                    var precio = spacer.getElementsByClassName('precioVistaArticulo')[0].textContent;
                    var link = spacer.getElementsByTagName('h2')[0].getElementsByTagName('a')[0].getAttribute("href"); 
                    var img = spacer.getElementsByClassName('browseProductImage')[0].getAttribute("src"); 
                    //generar el json
                    gjson += '"title": "'+titulo.trim()+'", ';
                    gjson += '"price": "'+precio.trim()+'", ';
                    gjson += '"link": "http://www.coolmod.com'+link.trim()+'", ';
                    gjson += '"img": "http://www.coolmod.com'+img.trim()+'"';
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