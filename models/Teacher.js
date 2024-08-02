const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: { type: String },
    age: { type: String },
    courses : {
        type: [mongoose.Types.ObjectId] ,
        ref: "Course"
    }
})

const model = mongoose.model('Teacher', schema);

module.exports = model