import express from 'express'
const router = express.Router({ mergeParams: true })
import {
	deletePhoto,
	getPhoto,
	getPhotos,
	SignS3,
	submitPhoto,
} from '../controllers/photoController.js'
import { requireAuth } from '../middleweare/authMiddleweare.js'

router.get('/sign-s3', SignS3)
router.route('/').post(requireAuth, submitPhoto).get(getPhotos)
router.route('/:id').get(getPhoto).delete(requireAuth, deletePhoto)
export default router
