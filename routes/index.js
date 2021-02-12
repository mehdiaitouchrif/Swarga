import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
	res.render('home', {
		title: 'Swarga: Free photos and pictures for everyone',
	})
})

export default router
