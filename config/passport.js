const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('./keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
        passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
            let userId = jwt_payload.userId
            let user = "SELECT * FROM users WHERE id = '" + userId + "'";
            db.query(user, (err, result) => {
                if(result) {
                    return done(null, result)
                }
                return done(null, false)
            })
        })
    )
}