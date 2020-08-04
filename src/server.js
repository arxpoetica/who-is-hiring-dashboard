import { green, red } from 'ansi-colors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import sirv from 'sirv'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const development = NODE_ENV === 'development'

process.on('uncaughtException', error => console.error(red('Uncaught Exception:'), error))
process.on('unhandledRejection', error => console.error(red('Unhandled Rejection:'), error))

// NOTE: order matters!!! https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459
const app = express()

app.use(morgan(development ? 'dev' : 'combined', {
	skip: (req, res) => development ? false : res.statusCode < 400,
}))
app.use((req, res, next) => {
	res.locals.nonce = uuidv4()
	next()
})
// SEE: https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			scriptSrc: ['\'self\'', (req, res) => `'nonce-${res.locals.nonce}'`],
		},
	},
}))
app.set('trust proxy', 1) // trust first proxy
app.use(compression({ threshold: 0 }))
app.use(sirv('static', { development }))
app.use(sapper.middleware())

app.listen(PORT, setTimeout(() => {
	console.log()
	console.log()
	console.log(green('     listening on port ') + PORT + green(' in ') + NODE_ENV + green(' mode'))
	console.log()
	console.log()
}, 100))
