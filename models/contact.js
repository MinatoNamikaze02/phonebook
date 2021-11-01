const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI
const uniqueValidator = require('mongoose-unique-validator')

console.log('connecting to', uri)

mongoose.connect(uri)
    .then(result=>{
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number:{
        type: String,
        minlength:8,
        maxlength:10,
        required: true,
    }
})
contactSchema.plugin(uniqueValidator)
contactSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v        
    }
})

module.exports = mongoose.model('Contact', contactSchema)