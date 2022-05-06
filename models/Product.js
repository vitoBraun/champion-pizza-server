const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    image: {type: String},
    description:{type: String},
    categoryName:{type: String}
})

module.exports = model('Product', schema)