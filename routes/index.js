import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
	console.log(req.user)
	res.render('home', {
		title: 'Swarga: Free photos and pictures for everyone',
		google: req.user
	})
})

export default router
