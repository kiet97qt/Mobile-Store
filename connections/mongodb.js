const mongoose = require('mongoose');
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect('mongodb://127.0.0.1:27017/mobile-store', opts);

mongoose.connection.once('open', function () {
    console.log('connect success!')
}).on('error', function(err) {
    console.log('err: ', err)
})