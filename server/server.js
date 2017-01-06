const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
//console.log(publicPath);

const port = process.env.PORT || 2000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, function(){
  console.log(`Server listening on port ${port}`);
});
