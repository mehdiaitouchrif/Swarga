import aws from 'aws-sdk'
import Photo from '../models/Photo.js'
import mongooseErrorHandler from '../utils/mongooseValidation.js'

export const SignS3 = (req, res) => {
	var config = {
		accessKeyId: process.env.AWS_ACCESS_ID,
		secretAccessKey: process.env.AWS_SECRET_KEY,
		region: process.env.AWS_REGION,
	}
	const s3 = new aws.S3(config)
	const fileName = req.query['file-name']
	const fileType = req.query['file-type']
	const s3Params = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: fileName,
		Expires: 60,
		ContentType: fileType,
		ACL: 'public-read',
	}

	s3.getSignedUrl('putObject', s3Params, (err, data) => {
		if (err) {
			console.log(err)
			return res.end()
		}
		const returnData = {
			signedRequest: data,
			url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
		}

		res.json(returnData)
	})
}

// POST /photos
export const submitPhoto = async (req, res) => {
	try {
		const photo = await Photo.create(req.body)
		res.status(201).json({ success: true })
	} catch (error) {
		const errors = mongooseErrorHandler(error)
		res.status(400).json({
			success: false,
			errors,
		})
	}
}

// GET /photos
// GET /user/:userId/photos
export const getPhotos = async (req, res) => {
	const keyword = req.query.term
		? {
				name: {
					$regex: req.query.term,
					$options: 'i',
				},
		  }
		: {}
	const photos = await Photo.find({ ...keyword }).populate(
		'user google',
		'firstName lastName photo '
	)

	res.status(200).json({ success: true, data: photos })
}

// GET /photos/:id
export const getPhoto = async (req, res) => {
	const photo = await Photo.findById(req.params.id).populate(
		'user google',
		'firstName lastName photo'
	)
	if (photo) {
		res.status(200).json({ success: true, data: photo })
	} else {
		res.status(404).json({ success: false, error: 'Image not found' })
	}
}

// DELETE /photos/:id
export const deletePhoto = async (req, res) => {
	const photo = await Photo.findById(req.params.id)
	await photo.remove()
	res.status(200).json({ success: true })
}

// Search
// GET /search?term="something"
export const searchPhotos = async (req, res) => {
	const keyword = req.query.term
		? {
				name: {
					$regex: req.query.term,
					$options: 'i',
				},
		  }
		: {}
	const photos = await Photo.find({ ...keyword }).populate(
		'user google',
		'firstName lastName photo'
	)

	res.render('search', {
		title: `${req.query.term} Pictures | Swarga`,
		term: req.query.term,
		google: req.user,
		photos: photos,
	})
}
