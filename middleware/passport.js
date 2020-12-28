const JwtStrategy = require('passport-jwt').Strategy;
const ExtracrJwt = require('passport-jwt').ExtractJwt;
const userController = require('../entities/user/user.controller');

const options = {
    jwtFromRequest: ExtracrJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
};

function passportJwtStrategy(passport) {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                const user = userController.getUserById(payload.userId);
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    );
};

module.exports = {
    passportJwtStrategy,
};
