const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

module.exports = {
    register: (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body)
        
        if(isValid == false) {
            return res.status(400).json(errors)
        }

        let { firstname, lastname, email, password, role, level, pays } = req.body

        let verifEmail = "SELECT * FROM `users` WHERE email = '" + email + "'";

        db.query(verifEmail, (err, result) => {
            if(err) {
                return res.status(500).send(err)
            }
            if (result.length > 0) {
                errors.email = 'Cet email est déjà utilisé'
                return res.status(400).json(errors)
            } else {
                bcrypt.hash(password, 10, function (err, hash) {

                    let newUser = "INSERT INTO `users` (firstname, lastname, email, password, role, level, pays) VALUES ('" + firstname + "', '" + lastname + "', '" + email + "', '" + hash + "', '" + role + "', '" + level + "', '" + pays + "')";

                    db.query(newUser, (err, result) => {
                        if (err) {
                            return res.status(500).json({ err })
                        }
                        res.status(201).json({ users: result, message: 'Inscription réussie !' })
                    })
                })
            }
        })
    },

    login: (req, res) => {
        try {
            const { email, password } = req.body
            const { errors, isValid } = validateLoginInput(req.body)
    
            if(!isValid) {
                return res.status(400).json(errors)
            }

            let verifEmail = "SELECT * FROM `users` WHERE email = '" + email + "'";
    
            db.query(verifEmail, (err, results) => {
                if(!results || !(bcrypt.compare(password, results[0].password))) {
                    errors.password = 'Le mot de passe est incorrect'
                    return res.status(400).json(errors)
                } else {
                    const payload = {
                        id: results[0].id,
                        firstname: results[0].firstname,
                        lastname: results[0].lastname,
                        email: results[0].email,
                        password: results[0].password,
                        pays: results[0].pays,
                        level: results[0].level,
                        role: results[0].role
                    }
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, 
                        (err, token) => {
                            res.json({ success: true, token: 'Bearer ' + token })
    
                            console.log("The token is: " + token);
    
                        const cookieOptions = {
                            expires: new Date(Date.now() + 3600 * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).json({token, message: 'Vous êtes connecté'})
                    })
                } 
            })
        } catch (error) {
            res.status(500).json({ error })
        }
    },

    getPassport: (req, res) => {
            res.json({
                id: req.user.id,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                email: req.user.email,
                pays: req.user.pays,
                level: req.user.level,
                role: req.user.role
            })
    },
    
    getProfile: (req, res) => {
        let decoded = jwt.verify(req.headers['authorization'], keys.secretOrKey)
        let userId = decoded.id
        let user = "SELECT * FROM users WHERE id = '" + userId + "'";

        db.query(user, (err, result) => {
            if(err) {
                message = "L'utilisateur n'existe pas"
                return res.status(500).json({err, message})
            }
            res.status(201).json({users: result})
        })
    },

    logout: (req, res) => {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res.status(200).json({message: 'Vous êtes déconnecté'})
    },

    editProfile: (req, res) => {

        let userId = req.params.id
        let { firstname, lastname, email, level, pays } = req.body

            let updateUser = "UPDATE `users` SET `firstname` = '" + firstname + "', `lastname`= '" + lastname + "', `email`= '" + email + "', `level` = '" + level + "', `pays` = '" + pays + "' WHERE `users`.`id` = '" + userId + "'";
            db.query(updateUser, (err, result) => {
                if(err) {
                    return res.status(500).json({ err })
                }
                res.status(201).json({ users: result })
            })
    },

    editRole: (req, res) => {
        let userId = req.params.id
        let role = req.body.role
        let updateRole = "UPDATE `users` SET `role`= '" + role + "' WHERE id = '" + userId + "'";

        db.query(updateRole, (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            }
            res.status(201).json({ users: result })
        })
    },

    deleteProfile: (req, res) => {
        let userId = req.params.id
        let deleteUser = "DELETE FROM users WHERE id = '" + userId + "'";

        db.query(deleteUser, (err, result) => {
            if (err) {
                return res.status(500).json({ error })
            }
            res.status(201).json({ users: result })
        })
    },
    
    getUsers: (req, res) => {
        let users = "SELECT * FROM users";
        db.query(users, (err, result) => {
            if(err) {
                return res.status(500).json({err})
            }
            res.status(201).json({users: result})
        })
    },


    getCountrySpots: (req, res) => {
        let userId = req.params.id
        let pays = "SELECT spots.id, spots.name, spots.image, spots.pays, spots.level from users JOIN spots ON users.pays = spots.pays WHERE users.id = '" + userId + "';" 
        

        db.query(pays, (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            } else {
                return res.status(200).json({ spots: result })
                    }
                })
        },

    getLevelSpots: (req, res) => {
        let userId = req.params.id
        let level = "SELECT spots.id, spots.name, spots.image, spots.pays, spots.level from users JOIN spots ON users.level = spots.level WHERE users.id = '" + userId + "';" 
        

        db.query(level, (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            } else {
                return res.status(200).json({ spots: result })
                    }
                })
            },

    addFavoris: (req, res) => {
        let userId = req.params.id
        let spotId = req.body.fav.spotId
        let favquery = "SELECT * FROM favoris WHERE userId = '" +userId+ "' AND spotId = '" +spotId+ "';"

        console.log(req.body.fav.spotId);
        

        db.query(favquery, (err, result) => {
            if(err) {
                return res.status(500).send(err)
            }
            if (result.length > 0) {
                message = "Ce spot est déjà dans vos favoris"
                res.status(403).json({ message })
            } else {
                if(err) {
                    return res.status(500).json({ err })
                }

                let query = "INSERT INTO favoris (userId, spotId) VALUES ('" + userId + "', '" + spotId + "');";

                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).json({ err })
                    }
                    res.status(200).json({ favoris: result })
                })
            }
        })
    },
    
    getFavoris: (req, res) => {
        let userId = req.params.id
        let query = "SELECT spots.id, spots.name, spots.image, spots.pays, spots.level FROM favoris JOIN spots ON favoris.spotId = spots.id JOIN users ON favoris.userId = users.id WHERE users.id = '" +userId+ "';" 
        
        db.query(query, (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            } else {
                return res.status(200).json({ favoris: result })
                }
            })
    }
}