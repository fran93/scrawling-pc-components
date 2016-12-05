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
                console.log(i+': title: '+response.produkts[i].title+'\t price: '+response.produkts[i].price+'\t link: '+response.produkts[i].link+'\t img: '+response.produkts[i].img);
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
                console.log(i+': title: '+response.produkts[i].title+'\t price: '+response.produkts[i].price+'\t link: '+response.produkts[i].link+'\t img: '+response.produkts[i].img);
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
                console.log(i+': title: '+response.produkts[i].title+'\t price: '+response.produkts[i].price+'\t link: '+response.produkts[i].link+'\t img: '+response.produkts[i].img);
            }
        }
    });
});