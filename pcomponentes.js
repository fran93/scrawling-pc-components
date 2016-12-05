console.log('Loading Pc Componentes');

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
    var url = 'https://www.pccomponentes.com/buscar/?query='+query;
    page.open(url, function (status) {
        if(status === 'success'){
            var json = page.evaluate(function() {
                var gjson = '{ "produkts" : [';
                $('#articleListContent article').each( function(index){
                    gjson += '{';
                    var titulo = $(this).find('h3').text();
                    var precio = $(this).find('.tarjeta-articulo__precios').text();
                    var link = $(this).find('h3 a').attr('href');
                    var img = $(this).find('.tarjeta-articulo__foto img').attr('src');
                    //generar el json
                    gjson += '"title": "'+titulo.trim()+'", ';
                    gjson += '"price": "'+precio.trim()+'", ';
                    gjson += '"link": "https://www.pccomponentes.com'+link.trim()+'", ';
                    gjson += '"img": "https:'+img.trim()+'"';
                    gjson += '}';
                    //añadir la coma
                    gjson += ',';
                });
                //quitar la coma de la última posición
                gjson = gjson.substring(0, gjson.length - 1);
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
