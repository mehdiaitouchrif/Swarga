import Google from '../models/Google.js'
import User from '../models/User.js'
import Photo from '../models/Photo.js'

export const profile_view = async (req, res) => {
	const id = req.params.id
	const user = await User.findById(id)
	const google = await Google.findById(id)

	const userRef = await Photo.find({ user: id }).populate(
		'user',
		'firstName lastName photo'
	)

	const googleRef = await Photo.find({ google: id }).populate(
		'google',
		'firstName lastName photo'
	)

	res.render('profile', {
		title: `${user ? user.firstName : google.displayName} | Swarga`,
		profile: user ? user : google ? google : null,
		photos: [...userRef, ...googleRef],
		google: req.user,
	})
}

export const edit_view = (req, res) => {
	console.log('profile', req.user)
	res.render('edit', {
		title: 'Swarga | Profile',
		google: req.user,
	})
}
