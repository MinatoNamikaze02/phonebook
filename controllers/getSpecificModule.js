
const Contact = require('../models/contact')

exports.getSpecific = (request, response, next) => {
    Contact.findById(request.params.id)
      .then(contact=>{
        response.json(contact)
      })
      .catch(error => next(error))
  }