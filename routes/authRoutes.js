import express from 'express'
import {
	login_view,
	join_view,
	login_with_google,
	login_google_callback,
	logout,
	join,
	login,
} from '../controllers/authControllers.js'
const router = express.Router()

router.route('/login').get(login_view).post(login)
router.route('/join').get(join_view).post(join)
router.get('/google', login_with_google)
router.get('/google/callback', login_google_callback)
router.get('/logout', logout)

export default router
