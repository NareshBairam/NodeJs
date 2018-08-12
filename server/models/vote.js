


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    userId: { type: String, required: true },
    candidateId : { type: String, required: true }
});


module.exports = mongoose.model('Vote', schema);