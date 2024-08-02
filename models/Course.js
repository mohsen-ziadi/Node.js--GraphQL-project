const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: { type: String },
    price: { type: String },
    teacher: {type: mongoose.Types.ObjectId, ref:"Teacher"}
})

const model = mongoose.model('Course', schema);

module.exports = model