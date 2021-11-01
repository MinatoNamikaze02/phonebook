const express = require('express')

const router = express.Router()
const {getSpecific} = require('../controllers/getSpecificModule')
router.get('/api/contacts/:id', getSpecific)

module.exports = router