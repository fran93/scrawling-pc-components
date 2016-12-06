var amazon = '/searchAmazon';
var coolmod = '/searchCool';
var pc = '/searchPc';

var request = 2;


$('#search').click(function(){
    var keyword = $('#search-box').val();
    //Comprobar que el usuario haya escrito algo
    if(keyword.length>3){
        //Limpiar la lista de otros productos
        console.log('Mandando petición');
        var search = { 'keyword': keyword};
        //Bloquear el botón 
        $('#search').prop( "disabled", true );
        //Activar la animación mientras el usuario espera
        $('body').append('<div id="loader"></div>');
        
        //mandar las peticiones al servidor
        $.ajax({
            type: "POST",
            url: coolmod,
            data: search,
            success: function(response)
            {
                for(var i=0;i<response.produkts.length;i++){
                    addProduct(response.produkts[i].title, response.produkts[i].price, response.produkts[i].link, response.produkts[i].img);
                }
                activeSearch();
            }
        });

        $.ajax({
            type: "POST",
            url: pc,
            data: search,
            success: function(response)
            {
                for(var i=0;i<response.produkts.length;i++){
                    addProduct(response.produkts[i].title, response.produkts[i].price, response.produkts[i].link, response.produkts[i].img);
                }
                activeSearch();
            }
        });

        $.ajax({
            type: "POST",
            url: amazon,
            data: search,
            success: function(response)
            {
                for(var i=0;i<response.produkts.length;i++){
                    addProduct(response.produkts[i].title, response.produkts[i].price, response.produkts[i].link, response.produkts[i].img);
                }
                activeSearch();
            }
        });
    }else{
        console.log('Escriba más de 3 caracteres');
    }
});

//añadir evento enter

//Mandar al servidor una petición post para que mande los productos
function sendRequest(){
    
}

//Pintar un producto en la vista
function addProduct(title, price, link, img){
    if($('#main .row').last().children().length>3){
        $('#main').append("<div class='row'> </div>");
    }
    $('#main .row').last().append("<a href='"+link+"' class='col-lg-3'>"+
        "<img src='"+img+"'> </img>"+
        "<p> "+title+" </p>"+
        "<p>"+price+"</p>"+
    "</a>");
}

//Permitir al usuario que pueda volver a pedir un producto
function activeSearch(){
    if(request===0){
        request=2;
        $('#loader').remove();
        $('#search').prop( "disabled", false );
    }else{
        request--;
    }
}