import express from 'express'
import {
	profile_view,
	edit_view,
	update_profile,
} from '../controllers/userController.js'
import { requireAuth } from '../middleweare/authMiddleweare.js'

const router = express.Router()

// Include photos resource
import photoRouter from './photoRoutes.js'
router.use('/:userId/photos', photoRouter)

router.get('/:id', profile_view)
router
	.route('/:id/settings')
	.get(requireAuth, edit_view)
	.put(requireAuth, update_profile)
export default router
