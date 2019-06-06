import fetch from 'cross-fetch'

export const fetchHN = async(path) => {
	return await fetch(process.env.DASHBOARD_HN_API + path)
}

export const GET = async(url) => {
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
		})
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
		return undefined
	}
}
export const POST = async(url, body) => {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
			body: JSON.stringify(body || {}),
		})
		const data = await res.json()
		return data
	} catch (error) {
		console.log(error)
		return undefined
	}
}
