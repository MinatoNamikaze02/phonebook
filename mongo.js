const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument : node mongo js <password>')
    process.exit(1)
}
const password = process.argv[2]

const URL = `mongodb+srv://fullstack:${password}@phonebook.fmcce.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(URL)

const contactSchema = new mongoose.Schema({
    name : String,
    phone: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv.length===3){
    console.log("phonebook:\n")
    Contact.find({}).then(result => {
        result.forEach(contact=>{
            console.log(`${contact.name} ${contact.phone}\n`)
            mongoose.connection.close()
        })
    }).catch(err=>{
        console.log("Error in fetching data")
        mongoose.connection.close()
    })
}else if(process.argv.length===5){
    const name = process.argv[3]
    const phoneNumber = process.argv[4]
    const contact = new Contact({
        name: name,
        phone : phoneNumber,
    })
    
    contact.save().then(result=>{
        console.log(`added ${name} number ${phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}