import express from 'express'
import { profile_view, edit_view } from '../controllers/userController.js'
import { requireAuth } from '../middleweare/authMiddleweare.js'

const router = express.Router()

router.get('/', requireAuth, profile_view)
router.get('/edit', requireAuth, edit_view)
export default router
