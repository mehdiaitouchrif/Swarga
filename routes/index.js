import express from 'express'
import { searchPhotos } from '../controllers/photoController.js'
import { home_view } from '../controllers/index.js'
const router = express.Router()

router.get('/', home_view)
router.get('/search', searchPhotos)
export default router
