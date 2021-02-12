import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const res = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		console.log(`MongoDB Atlas connected ${res.connection.host}`)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

export default connectDB
