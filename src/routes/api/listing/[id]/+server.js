import { json } from '@sveltejs/kit'
import { PUBLIC_HN_API } from '$env/static/public'

/** @type {import('./$types').RequestHandler} */
export async function POST({ fetch, params }) {
	const res = await fetch(`${PUBLIC_HN_API}/items/${params.id}`)
	const data = await res.json()
	return json(data)
}
