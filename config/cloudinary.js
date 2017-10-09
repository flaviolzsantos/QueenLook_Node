var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'flvlz', 
    api_key: '329835991597966', 
    api_secret: '7gQKtB5Z_6LhDcjUuWkLOp4SwKs' 
  });

module.exports = cloudinary;