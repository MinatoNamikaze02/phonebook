//mongo 
const Contact = require('./models/contact')
//general imports
const express = require('express')
const app = express()
//logging middleware
const morgan = require('morgan')
//router imports
const getAll = require('./routes/getAll')
const getInfo = require('./routes/getInfo')
const getSpecific = require('./routes/getSpecific')
const deleteSpecific = require('./routes/deleteSpecific')
const updateSpecific = require('./routes/updateSpecific')
const addSpecific = require('./routes/addspecific')
//middleware imports
const {errorHandler, unknownEndpoint} = require('./utils/middleware')
//env variables
require('dotenv').config()
//*important* (order specific)
app.use(express.static('build'))
app.use(express.json())

//logs def
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })   
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//get req responding with contacts obj
app.use(getAll)

//get req to get info about the contact list
app.use(getInfo)

//get request responding with specific id contact obj
app.use(getSpecific)

//delete req to delete a contact with given ID
app.use(deleteSpecific)

//update phone number request
app.use(updateSpecific)

//post req to add contacts to the object
app.use(addSpecific)

//middleware
app.use(unknownEndpoint)

app.use(errorHandler)


//misc
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
