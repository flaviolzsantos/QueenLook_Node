var app = require('./infra/app.js'),
    srvHome = require('./servico/adm/srvHome')(app),
    srvUi = require('./servico/ui/srvUi')(app);

app.listen(3000);
