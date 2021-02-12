import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/login', (req, res) => {
	res.render('login', {
		title: 'Swarga | Login',
	})
})

router.get('/register', (req, res) => {
	res.render('register', {
		title: 'Swarga | Register',
	})
})

// Auth w/Google | GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// auth cb | GET /auth/google/callback
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect('/')
	}
)

// Logout | GET /auth/logout
router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

export default router
