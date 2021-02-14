export const profile_view = (req, res) => {
	res.render('profile', {
		title: 'Swarga | Profile',
	})
}

export const edit_view = (req, res) => {
	console.log('profile', req.user)
	res.render('edit', {
		title: 'Swarga | Profile',
	})
}
