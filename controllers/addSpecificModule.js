const Contact = require('../models/contact')

exports.addSpecific = (request, response, next) => {
    const body = request.body
    if (body.name && body.number) {
      const contact = new Contact({
        name: body.name,
        number: body.number,
        date: new Date(),
      })
      contact
        .save()
        .then(savedContact => {
        response.json(savedContact)
      })
        .catch(error=>next(error))
    }else{
      return response.status(400).json({error: 'content missing'})
    }
  }