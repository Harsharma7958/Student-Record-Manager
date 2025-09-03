const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/srm')

const facultySchema = mongoose.Schema({
    fname: String,
    femail: String,
    fclass: { type: String, enum: ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'] },
    fpass: String
})

module.exports = mongoose.model('facultyDetails', facultySchema)