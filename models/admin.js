const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/srm')

const adminSchema = mongoose.Schema({
    aemail: String,
    apass: String
})

module.exports = mongoose.model('admindetails', adminSchema)