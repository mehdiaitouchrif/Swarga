const mongooseErrorHandler = (err, resource) => {
	let errors = []
	if (err.code === 11000) {
		errors.push({
			field: 'email',
			message: `This email is already taken`,
		})
	} else {
		Object.keys(err.errors).map((key) =>
			errors.push({ field: key, message: err.errors[key].message })
		)
	}
	return errors
}

export default mongooseErrorHandler
