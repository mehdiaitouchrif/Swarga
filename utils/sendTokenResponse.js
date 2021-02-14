const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken()
	const options = {
		httpOnly: true,
		maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
	}

	if (process.env.NODE_ENV === 'production') {
		options.secure = true
	}

	res.cookie('token', token, options)
	res.status(statusCode).json({
		success: true,
	})
}

export default sendTokenResponse
