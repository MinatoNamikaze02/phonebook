const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI

console.log('connecting to', uri)

mongoose.connect(uri)
    .then(result=>{
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v        
    }
})

module.exports = mongoose.model('Contact', contactSchema)