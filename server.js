var app = require('./config/app.js'),
    cloudinary = require('./config/cloudinary.js'),
    homeRota = require('./app/rotas/adm/home')(app, cloudinary),
    portifolioRota = require('./app/rotas/adm/portifolio')(app, cloudinary),
    uiRota = require('./app/rotas/ui/ui')(app);

app.listen(3000);
