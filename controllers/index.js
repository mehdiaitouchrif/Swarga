import Photo from '../models/Photo.js'

export const home_view = async (req, res) => {
	const photos = await Photo.find({}).populate(
		'user google',
		'firstName lastName photo'
	)
	res.status(200).render('home', {
		title: 'Swarga: Free photos and pictures for everyone',
		photos,
		google: req.user,
	})
}
