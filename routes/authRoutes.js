import express from 'express'
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

export default router
