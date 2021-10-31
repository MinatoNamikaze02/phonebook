const Contact = require('./models/contact')
require('dotenv').config()
const morgan = require('morgan')
const express = require("express")
const mongoose = require('mongoose')

const app = express()
app.use(express.static('build'))
app.use(express.json())
//logging
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })   // returns body for logging

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//errorhandling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}
//returns number of entries in the contacts collection in mongo
const getMaxId = () => {
  let sum=0
  Contact.find({}).then(contacts=>{
    sum+=1
  })
  return sum
}

//get req responding with contacts obj
app.get('/api/contacts/', (request, response, next) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
  .catch(error => next(error))
})

//get req to get info about the contact list
app.get('/info', (request, response, next) => {
  const jsonObj = {
    content: `PhoneBook has ${getMaxId()} entries`,
    date: new Date(),
  }
  response.send(`<div><p>${jsonObj.content}</p><p>${jsonObj.date}</p></div>`)
})


//get request responding with specific id contact obj
app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(contact=>{
    response.json(contact)
  })
  .catch(error => next(error))
})

//delete req to delete a contact with given ID
app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result=> {
      response.status(204).end()
    })
    .catch(error => next(error))
})
//update phone number request
app.put('/api/contacts/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name : body.name,
    number : body.number,
  }
  Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

//post req to add contacts to the object
app.post('/api/contacts', (request, response, next) => {
  const body = request.body
  if (body.name && body.number) {
    const contact = new Contact({
      name: body.name,
      number: body.number,
      date: new Date(),
    })
    contact.save().then(savedContact => {
      response.json(savedContact)
    })
  } else {
    return response.status(400).json({error: 'content missing'})
  }
})

//unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)


//misc
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
