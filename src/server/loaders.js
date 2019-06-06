import fetch from 'cross-fetch'

export const GET = async function(url) {
	const res = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
	})
	try { return await res.json() } catch (error) { return undefined }
}

export const POST = async function(url, body) {
	body = body || {}
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify(body),
	})
	try { return await res.json() } catch (error) { return undefined }
}
