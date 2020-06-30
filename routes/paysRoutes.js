const express =  require('express')
const paysController = require('../controllers/paysController')

const router = express.Router()

router.get('/', paysController.getAllCountries)

module.exports = router