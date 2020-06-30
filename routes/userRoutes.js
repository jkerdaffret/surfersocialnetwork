const express = require('express')
const userController = require('../controllers/userController')
const passport = require('passport')

const router = express.Router()

router.get('/test', (req, res) => res.json({ msg: 'La route est ouverte'}))

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/passport', passport.authenticate('jwt', {session: false }), userController.getPassport)
router.get('/', userController.getUsers)
router.get('/:id/country', passport.authenticate('jwt', {session: false }), userController.getCountrySpots)
router.get('/:id/level', passport.authenticate('jwt', {session: false }), userController.getLevelSpots)
router.post('/:id/addfavoris', passport.authenticate('jwt', {session: false }), userController.addFavoris)
router.get('/:id/favoris', passport.authenticate('jwt', {session: false }), userController.getFavoris)

router
    .route('/:id')
    .get(userController.getProfile)
    .patch(userController.editProfile)
    .put(userController.editRole)
    .delete(userController.deleteProfile)

    module.exports = router