const express = require('express')
const comentsController = require('../controllers/comentsController')

const router = express.Router()

router.get('/', comentsController.getComentsBySpot)
router.post('/add', comentsController.addComent)

module.exports = router