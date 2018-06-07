var  serve = require('serve');
var path = require('path');
var staticPath = path.resolve(__dirname,'../dist');

const server = serve(staticPath, {
  port: 5000,
})
