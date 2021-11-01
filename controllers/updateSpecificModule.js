const Contact = require('../models/contact')

exports.updateSpecific = (request, response, next) => {
  const body = request.body
  
  const contact = {
    name : body.name,
    number : body.number,
  }
  Contact.findByIdAndUpdate(request.params.id, contact,{runValidators: true}, {new: true})
    .then(updatedContact => {
    response.json(updatedContact)
  })
    .catch(error => next(error))
}