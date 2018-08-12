
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')


var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    creation_dt: { type: String, required: true }
});

schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}


schema.methods.isValid = function (hashPassword) {
    return bcrypt.compareSync(hashPassword, this.password);
}

module.exports = mongoose.model('User', schema);