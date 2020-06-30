module.exports = {
    getAllCountries: (req, res) => {
        db.query("SELECT * FROM `pays` ORDER BY `name`", (err, result) => {
            if(err) {
                return res.status(500).json({ err })
            } else {
                res.status(200).json({pays: result})
            }
        })
    }
}