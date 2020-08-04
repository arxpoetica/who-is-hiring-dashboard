import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// FIXME: getAll should just HAPPEN in this file, and cache
// NO NEED TO CALL IT
export const config = {
	cached: undefined,
	getAll() {
		if (!this.cached) {
			try {
				// NOTE: necessary so build doesn't break:
				const refreshFilePath = path.resolve(process.cwd(), 'src/routes/_refresh.svelte')
				if (!fs.existsSync(refreshFilePath)) {
					fs.closeSync(fs.openSync(refreshFilePath, 'w'))
				}
				const results = dotenv.config()
				if (results.error) { throw new Error(results.error) }
			} catch (error) {
				console.log('no .env file')
				// console.log(error)
			}

			this.cached = {}
			for (let key in process.env) {
				if (key.match(/^DASHBOARD_/)) {
					this.cached[`process.env.${key}`] = JSON.stringify(process.env[key])
				}
			}
			this.cached['process.env.NODE_ENV'] = JSON.stringify(process.env.NODE_ENV)
		}

		return this.cached
	},
}
