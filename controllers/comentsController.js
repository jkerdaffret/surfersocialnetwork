module.exports = {
    addComent: (req, res) => {
        let spotId = req.params.id
        let text = req.body.text
        let userId = req.users.id

        let query = "INSERT INTO `coments`(text, userId, spotId) VALUES ('" + text + "', '" + userId + "', '" + spotId +  "')";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ err })
            }
            res.status(200).json({ coments: result, message: 'Commentaire posté !' })
        })
    },

    getComentsBySpot: (req, res) => {
        let spotId = req.params.id

        let query = "SELECT users.firstname, users.lastname, spots.id, coments.text FROM coments JOIN users ON coments.userId = users.id JOIN spots ON coments.spotId = spots.id WHERE coments.spotId = '" + spotId + "' ORDER BY coments.id DESC LIMIT 10;"

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ err })
            }
            res.status(200).json({ coments: result})
        })
    },

    removeComent: (req, res) => {
        
    }
}