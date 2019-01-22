const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const { SECRET } = require('../config');

const extractToken = req =>
	ExtractJwt.fromExtractors([
		ExtractJwt.fromAuthHeaderAsBearerToken(),
		ExtractJwt.fromBodyField('token'),
		ExtractJwt.fromHeader('token'),
		ExtractJwt.fromUrlQueryParameter('token')
	])(req);

module.exports.passportMiddleware = pass =>
	pass.use(
		new Strategy(
			{
				jwtFromRequest: extractToken,
				secretOrKey: SECRET
			},
			async (payload, done) => {
				try {
					const user = await User.findById(payload.id);
					return user ? done(null, user) : done(null, false);
				} catch (error) {
					console.error('Strategy error:', error);
					return done(error, false);
				}
			}
		)
	);

module.exports.extractUser = () => (req, res, next) =>
	passport.authenticate('jwt', { session: false }, (err, data, info) => {
		req.user = data || null;
		next();
	})(req, res, next);

module.exports.auth = () => (req, res, next) =>
	req.user ? next() : res.status(401).send('Unauthorized');
