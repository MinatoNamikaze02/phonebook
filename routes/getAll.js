const express = require('express')

const router = express.Router()

const {getAllModule} = require('../controllers/getAllModule')

router.get('/api/contacts/', getAllModule)

module.exports = router