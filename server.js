var app = require('./config/app.js'),
    homeRota = require('./app/rotas/adm/home')(app),
    portifolioRota = require('./app/rotas/adm/portifolio')(app),
    uiRota = require('./app/rotas/ui/ui')(app);

app.listen(3000);
