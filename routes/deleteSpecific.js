const express = require('express')

const router = express.Router()

const {deleteSpecific} = require('../controllers/deleteSpecificModule')

router.delete('/api/contacts/:id', deleteSpecific)

module.exports = router