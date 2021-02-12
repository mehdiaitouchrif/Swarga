import path from 'path'
import express from 'express'
import exphbs from 'express-handlebars'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Env vars
dotenv.config()

// Get db
import connectDB from './config/connectDB.js'

// Route files
import index from './routes/index.js'
import authRoutes from './routes/authRoutes.js'

// Express
const app = express()

// Connect db
connectDB()

// Set Static Folder
// Set static folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Routes
app.use('/', index)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
	console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
