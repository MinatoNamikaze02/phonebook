const { request, response } = require("express");
const express = require("express");
const app = express();

const morgan = require('morgan')
app.use(express.static('build'))
app.use(express.json());
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })   // returns body for logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//returns max Id value in the contacts array
const getMaxId = () => {
  const max = contacts.length
    ? Math.max(...contacts.map((contact) => contact.id))
    : 0;
  return max;
};

//returns min Id value in the contacts array
const getMinId = () => {
  const min = contacts.length
    ? Math.min(...contacts.map((contact) => contact.id))
    : 0;
  return min;
};

//random ID generator
const generateRandomId = () => {
  return Math.floor(Math.random() * 100000);
};

//checks if a contact with the same name already exists
const isNameRepeated = (checkContact) => {
  const isIncludes = contacts.filter(contact=> contact.name===checkContact.name)
  return isIncludes
};

//get req responding with contacts obj
app.get("/api/contacts/", (request, response) => {
  const jsonData = request.body;
  console.log(jsonData);
  response.json(contacts);
});

//get req to get info about the contact list
app.get("/info", (request, response) => {
  const jsonObj = {
    content: `PhoneBook has ${getMaxId()} entries`,
    date: new Date(),
  };
  response.send(`<div><p>${jsonObj.content}</p><p>${jsonObj.date}</p></div>`);
});


//get request responding with specific id contact obj
app.get("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  const maxId = getMaxId();
  const minId = getMinId();
  if (id > maxId || id < minId) {
    console.log("ID OUT OF BOUNDS");
    response.status(404).end();
  }
  const contact = contacts.find((cont) => cont.id === id);
  if (contact) {
    response.json(contact);
  }
  elseP;
  response.status(404).end();
});

//delete req to delete a contact with given ID
app.delete("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  const deletedContact = contacts.filter((contact) => contact.id === id);
  contacts = contacts.filter((contact) => contact.id !== id);
  console.log(deletedContact);
  response.status(204).end();
});

//post req to add contacts to the object
app.post("/api/contacts", (request, response) => {
  const checkContact = request.body;

  if (isNameRepeated(checkContact)) {
    response.json({
      error: "Contact name must be unique",
    });
  } else if (checkContact.name && checkContact.number) {
    const contact = {
      name: checkContact.name,
      number: checkContact.number,
      id: generateRandomId(),
    };
    contacts = contacts.concat(contact);
    response.json(contact);
  } else {
    response.json({
      error: "content-missing",
    });
  }
});

//misc
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
