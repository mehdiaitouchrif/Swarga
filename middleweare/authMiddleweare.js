import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const requireAuth = async (req, res, next) => {
	const token = req.cookies.token

	// check json web token exists & is verified
	if (token) {
		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			next()
		} catch (error) {
			console.error(error)
			res.redirect('/auth/login')
		}
	} else if(req.isAuthenticated()) {
		next()
	}  else {
		res.redirect('/auth/login')
	}
}

const getCurrentUser = async (req, res, next) => {
	const token = req.cookies.token

	if (token) {
		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
			res.locals.user = await User.findById(decodedToken.id).select('-password')
			next()
		} catch (error) {
			res.locals.user = null
			next()
		}
	} else {
		res.locals.user = null
		next()
	}
}

export { requireAuth, getCurrentUser }
