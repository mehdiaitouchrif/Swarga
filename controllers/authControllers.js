import passport from 'passport'
import User from '../models/User.js'
import sendTokenResponse from '../utils/sendTokenResponse.js'
import mongooseErrorHandler from '../utils/mongooseValidation.js'

// Render Login view
export const login_view = (req, res) => {
	res.render('login', {
		title: 'Swarga | Login',
	})
}

// Render Join view
export const join_view = (req, res) => {
	res.render('join', {
		title: 'Swarga | Join',
	})
}

// Login with Google
export const login_with_google = passport.authenticate('google', {
	scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email',
	],
})

// Google callback
export const login_google_callback =
	(passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect('/')
	})

// Logout
export const logout = (req, res) => {
	res.cookie('token', '', { maxAge: 1 })
	res.redirect('/')
}

// Custom authentication

// Join
export const join = async (req, res) => {
	const { firstName, lastName, email, username, password } = req.body

	try {
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			username,
		})
		sendTokenResponse(user, 201, res)
	} catch (error) {
		console.log(error)
		const errors = mongooseErrorHandler(error)
		res.status(400).json({ success: false, errors })
	}
}

// Login
export const login = async (req, res) => {
	const { email, password } = req.body

	if (!password) {
		res.status(400).json({
			success: false,
			errors: [{ field: 'password', message: 'Please enter your password' }],
		})
	}

	if (!email) {
		res.status(400).json({
			success: false,
			errors: [{ field: 'email', message: 'Please enter your email' }],
		})
	}

	const user =
		(await User.findOne({ email })) || (await User.findOne({ username: email }))
	if (user) {
		const isMatch = await user.matchPasswords(password)
		if (isMatch) {
			sendTokenResponse(user, 201, res)
		} else {
			res.status(400).json({
				success: false,
				errors: [{ field: 'password', message: 'Invalid password' }],
			})
		}
	} else {
		res.status(404).json({
			success: false,
			errors: [{ field: 'email', message: "This email doesn't exist" }],
		})
	}
}
