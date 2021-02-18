import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import strategiesConfig from './config/OAuth.js'

// Env vars
dotenv.config()

// Get db
import connectDB from './config/connectDB.js'

// Route files
import index from './routes/index.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import photoRoutes from './routes/photoRoutes.js'
import { getCurrentUser } from './middleweare/authMiddleweare.js'

// Express
const app = express()
app.use(express.json())
app.use(cookieParser())

// Connect db
connectDB()

// Set Static Folder
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars
app.set('view engine', 'ejs')

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Passport middleweare
strategiesConfig(passport)

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.get('*', getCurrentUser)
app.use('/', index)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/photos', photoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
	console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
