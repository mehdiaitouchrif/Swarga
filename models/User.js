import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			required: true,
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
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
