const express = require('express')

const router = express.Router()

const {addSpecific} = require('../controllers/addSpecificModule')

router.post('/api/contacts', addSpecific)

module.exports = router