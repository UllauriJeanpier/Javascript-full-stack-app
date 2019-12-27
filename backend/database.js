const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);

mongoose.connect('mongodb://localhost/javascriptdb', {
    useNewUrlParser : true
}) 
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;