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

export const edit_view = async (req, res) => {
	console.log('profile', req.user)
	const user = await User.findById(req.params.id)
	res.render('edit', {
		title: `${
			user ? user.firstName + ' ' + user.lastName : req.user.displayName
		} | Swarga settings`,
		google: req.user,
	})
}

export const update_profile = async (req, res) => {
	const user = await User.findById(req.params.id)
	const google = await Google.findById(req.params.id)
	const { firstName, lastName, email, bio, photo } = req.body

	if (user) {
		user.firstName = firstName || user.firstName
		user.lastName = lastName || user.lastName
		user.email = email || user.email
		user.bio = bio || user.email
		user.photo = photo || user.photo

		const updatedUser = await user.save()
		res.json({ success: true, data: updatedUser })
	}
	if (google) {
		google.firstName = firstName || google.firstName
		google.lastName = lastName || google.lastName
		google.bio = bio || google.email
		google.photo = photo || google.photo

		const updatedGoogle = await google.save()
		res.json({ success: true, data: updatedGoogle })
	}
}
