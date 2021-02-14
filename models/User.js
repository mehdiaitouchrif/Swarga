import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please enter your first name'],
		},
		lastName: {
			type: String,
		},
		username: {
			type: String,
			unique: true,
			minlength: [3, 'Minimum username length is 3'],
			required: [true, 'Please enter a username'],
			match: [
				/^(?=.{4})[a-z][a-z\d]*_?[a-z\d]+$/i,
				'Only letters, numbers and underscores',
			],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Please enter an email'],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Please enter a password'],
			minlength: [6, 'Minimum length is 6 characters'],
		},
		photo: {
			type: String,
		},
		bio: {
			type: String,
		},
		links: {
			type: [String],
		},
	},
	{ timestamps: true }
)

userSchema.pre('save', async function (req, res, next) {
	if (!this.isModified('password')) {
		next()
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

// Match Passwords
userSchema.methods.matchPasswords = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
