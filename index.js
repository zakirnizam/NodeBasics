var express = require('express');
var app = express();    

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/users', require('./routes/api/users')); 

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});