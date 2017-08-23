var service = new ServiceUtil();

function getHome() {
    return service.get("Ui/Home/ObterHome", false).responseJSON;
};

/*function getPortifolio() {
    service.get("Ui/Portifolio/ObterPortifolio", true).done(function(data){
        var temp = Handlebars.compile(jQuery("#portifolioScript").html());
        jQuery("#portifolio").html(temp(data));
    });
};*/
