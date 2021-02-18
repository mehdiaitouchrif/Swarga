import express from 'express'
import { profile_view, edit_view } from '../controllers/userController.js'
import { requireAuth } from '../middleweare/authMiddleweare.js'

const router = express.Router()

// Include photos resource
import photoRouter from './photoRoutes.js'
router.use('/:userId/photos', photoRouter)

router.get('/:id', profile_view)
router.get('/:id/settings', requireAuth, edit_view)
export default router
