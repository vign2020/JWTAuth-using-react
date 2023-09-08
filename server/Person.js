const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    street : String,
    city : String
})
const postsSchema = new mongoose.Schema({
    content: {
        type: String,
        maxlength: 150, // Limit posts to 150 characters
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

})
const personSchema = new mongoose.Schema({
    name: String,
    address: addressSchema,
    posts : [postsSchema]
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
