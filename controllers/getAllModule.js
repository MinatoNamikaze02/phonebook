const Contact = require('../models/contact')
exports.getAllModule = (request, response, next)=>{
  Contact
    .find({})
    .then(contacts => {
        response.json(contacts)
      })
    .catch(error => next(error))
}