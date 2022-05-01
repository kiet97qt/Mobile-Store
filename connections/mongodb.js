const mongoose = require('mongoose');
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
//mongoose.connect('mongodb+srv://kietlna1997:Redagon291@cluster0.1bcuc.mongodb.net/test', opts);
mongoose.connect('mongodb://admin:password@localhost:27017/', opts);
mongoose.connection.once('open', function () {
    console.log('connect success!')
}).on('error', function(err) {
    console.log('err: ', err)
})