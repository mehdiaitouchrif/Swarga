import express from 'express'
import {
	login_view,
	join_view,
	logout,
	join,
	login,
} from '../controllers/authControllers.js'
const router = express.Router()
import passport from 'passport'

router.route('/login').get(login_view).post(login)
router.route('/join').get(join_view).post(join)
router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
	res.redirect('/')
} )
router.get('/logout', logout)

export default router
