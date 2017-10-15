var app = require('./config/app.js'),
    cloudinary = require('./config/cloudinary.js'),
    homeRota = require('./app/rotas/adm/home')(app, cloudinary),
    portifolioRota = require('./app/rotas/adm/portifolio')(app, cloudinary),
    uiRota = require('./app/rotas/ui/ui')(app)
    upload = require('./app/rotas/adm/upload')(app, cloudinary);

app.listen(3000);
