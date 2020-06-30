const express = require('express')
const spotController = require('../controllers/spotController')
const passport = require('passport')

const router = express.Router()

router.get('/', spotController.getAllSpots)
router.post('/add', spotController.addSpot)


router
    .route('/:id')
    .get(spotController.getSpot)
    .patch(passport.authenticate('jwt', { session: false }), spotController.updateSpot)
    .delete(passport.authenticate('jwt', { session: false }), spotController.deleteSpot)

module.exports = router