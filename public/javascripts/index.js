$('#search').click(function(){
console.log('Mandando petición');
var search = { 'keyword': 'Asus Z170 PRO GAMING'};
var amazon = '/searchAmazon';
var coolmod = '/searchCool';
var pc = '/searchPc';

    $.ajax({
        type: "POST",
        url: coolmod,
        data: search,
        success: function(response)
        {
            for(var i=0;i<response.produkts.length;i++){
                addProduct(response.produkts[i].title, response.produkts[i].price, response.produkts[i].link, response.produkts[i].img);
            }
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
        }
    });
    
});

function addProduct(title, price, link, img){
    //3 divs por producto
    if($('#main .row').last().children().length>3){
        $('#main').append("<div class='row'> </div>");
    }
    $('#main .row').last().append("<a href='"+link+"' class='col-lg-3'>"+
        "<h2> "+title+" </h2>"+
        "<img src='"+img+"'> </img>"+
        "<p>"+price+"</p>"+
    "</a>");
}