function ServiceUtil() {

    var urlRaiz = "http://wwww.queenlook.com.br/";

    this.get = function (url) {

        var retorno = jQuery.ajax(
            {
                type: "GET",
                url: this.getFullUrl(url),
                dataType: "json",
                async: false
            });

        return retorno.responseJSON;
    };



    this.getFullUrl = function (url) {
        return urlRaiz + url;
    };

};

