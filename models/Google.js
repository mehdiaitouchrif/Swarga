import mongoose from 'mongoose'

const googleSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
		},
		displayName: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
		},
		username: {
			type: String,
		},
		bio: {
			type: String,
		},
		location: {
			type: String,
		},
		links: {
			type: [String],
		},
	},
	{ timestamps: true }
)

const GoogleUser = mongoose.model('Google', googleSchema)

export default GoogleUser
