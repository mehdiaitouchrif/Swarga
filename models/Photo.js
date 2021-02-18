import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		google: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Google',
		},
		name: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
				},
			},
		],
	},
	{ timestamps: true }
)

const Photo = mongoose.model('Photo', photoSchema)

export default Photo
