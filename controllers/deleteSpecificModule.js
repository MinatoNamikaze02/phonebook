const Contact = require('../models/contact')

exports.deleteSpecific = (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
      .then(result=> {
        response.status(204).end()
      })
      .catch(error => next(error))
  }