const express = require('express')

const router = express.Router()

const {updateSpecific} = require('../controllers/updateSpecificModule')

router.put('/api/contacts/:id', updateSpecific)

module.exports = router