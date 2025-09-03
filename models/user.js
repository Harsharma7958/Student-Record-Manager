const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/srm')

const studentSchema = mongoose.Schema({
    name: { type: String },
    class: { type: String, enum: ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'] },
    rollno: { type: Number }
})

module.exports = mongoose.model('studentDetails', studentSchema)