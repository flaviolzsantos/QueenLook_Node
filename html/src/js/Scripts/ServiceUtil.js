function ServiceUtil() {

    //var urlRaiz = "http://www.queenlook.com.br/";
    var urlRaiz = "/";

    this.get = function (url, sync) {

        return jQuery.ajax(
            {
                type: "GET",
                url: this.getFullUrl(url),
                dataType: "json",
                async: sync
            });
    };



    this.getFullUrl = function (url) {
        return urlRaiz + url;
    };

};

