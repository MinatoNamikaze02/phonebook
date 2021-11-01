const Contact = require('../models/contact')

const getMaxId = () => {
    let sum=0
    Contact.find({}).then(contact=>{
      sum+=1
    })
    return sum
  }

exports.getInfo = (request, response, next) => {
    const jsonObj = {
      content: `PhoneBook has ${getMaxId()} entries`,
      date: new Date(),
    }
    response.send(`<div><p>${jsonObj.content}</p><p>${jsonObj.date}</p></div>`)
  }