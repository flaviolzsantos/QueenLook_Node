var cloudinary = require('cloudinary'),
fs = require('fs');

cloudinary.config({ 
    cloud_name: 'flvlz', 
    api_key: '329835991597966', 
    api_secret: '7gQKtB5Z_6LhDcjUuWkLOp4SwKs' 
  });

  cloudinary.upload = function(caminho, call){
    cloudinary.uploader.upload(caminho, function(result){
      fs.unlink(caminho);
      call(result);
    });
  }

module.exports = cloudinary;