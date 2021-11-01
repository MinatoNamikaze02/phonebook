const express = require('express')

const router = express.Router()

const {getInfo} = require('../controllers/getInfoModule')


router.get('/info', getInfo)
module.exports = router