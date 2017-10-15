
let multer  =   require('multer');

let caminho = __dirname.substring(0, __dirname.length - '\\app\rotas\adm'.length - 1) + 'html/imagesTmp';

var storagePortifolio =   multer.diskStorage({
destination: function (req, file, callback) {
    callback(null, caminho);
},
filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
}});

let uploadPortifolio = multer({ storage : storagePortifolio }).single('files');

module.exports = function(app, cloudinary){

    app.post('/Admin/UploadFile',function(req, res){
        uploadPortifolio(req, res, function (err) {
            
        if (err)
            res.send({status:500, message :err});
        else
            res.send({status: 200, nomeArquivo : req.file.filename});
        });
    });
}