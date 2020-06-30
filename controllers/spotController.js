const fs = require("fs");

const validateSpotInput = require('../validation/spot')

module.exports = {
    addSpot: (req, res) => {

        console.log(req.body);
        
        const { errors, isValid } = validateSpotInput(req.body)

        if(!isValid) {
            return res.status(400).json(errors)
        }

        console.log('files :', req.files);
        

        if(!req.files) {
            return res.status(400).json({"error": "Pas de fichier transféré" });
        }

        let message = "";
        let { name, latitude, longitude, description, level, pays } = req.body;
        let uploadedFile = req.files.image;
        let image = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split("/")[1];
        image_name = name + "." + fileExtension;

        let nameQuery = "SELECT * FROM `spots` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if(err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = "Ce spot existe déjà";
                res.status(403).json({ message });
            } else {
                if (
                    uploadedFile.mimetype === "image/png" ||
                    uploadedFile.mimetype === "image/jpeg" ||
                    uploadedFile.mimetype === "image/gif"
                ) {
                    uploadedFile.mv(`public/images/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).json({ err });
                        }

                        let query =
                        "INSERT INTO `spots`(name, image, latitude, longitude, description, level, pays) VALUES ('" +
                        name +
                        "', '" +
                        image_name +
                        "', '" +
                        latitude +
                        "', '" +
                        longitude +
                        "', '" +
                        description +
                        "', '" +
                        level +
                        "', '" +
                        pays +
                        "')";

                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).json({ err });
                            }
                            res.status(200).json({ spots: result });
                        })
                    })
                } else {
                    message = "Ce format de d'image n'est pas accepté, seul les fichiers de type 'gif', 'jpeg' et 'png' sont autorisés";
                    res.status(403).json({ message });
                }
            }
        });
    },

    getAllSpots: (req, res) => {
        db.query("SELECT * FROM `spots` ORDER BY `name`", (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            } else {
                res.status(200).json({spots: result})
            }
        });
    },

    getSpot: (req, res) => {
        db.query("SELECT * FROM `spots` WHERE id = '" + req.params.id + "'", (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            } else {
                res.status(200).json({spots: result})
            }
        });
    },

    updateSpot: (req, res) => {

        let spotId = req.params.id;
        let { name, latitude, longitude, description, level, pays } = req.body

        let query = "UPDATE spots SET name = '" + name + "', latitude = '" + latitude + "', longitude = '" + longitude + "', description = '" + description + "', level = '" + level + "', pays = '" + pays + "' WHERE spots.id = '" + spotId + "';";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ err });
            }
            res.status(200).json({ result });
        })
    },

    deleteSpot: (req, res) => {
        let spotId = req.params.id;
        let getImageQuery = 'SELECT image FROM `spots` WHERE id = "' + spotId + '"';
        let fav = 'DELETE FROM favoris WHERE spotId = "' + spotId + '"';
        let query = 'DELETE FROM spots WHERE id = "' + spotId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ err });
            }

            let image = result[0].image;

            fs.unlink(`public/images/${image}`, (err) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                db.query(fav, (err, result) => {
                    if(err) {
                        return res.status(500).json({ err });
                    }
                db.query(query, (err, result) => {
                    if(err) {
                        return res.status(500).json({ err });
                    }
                    res.status(200).json({ spots: result })
                    });
                });
            });
        });
    },
}