import { PUBLIC_HN_API } from '$env/static/public'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

	let data

	// try {
	// 	const { cache } = await import('./_cache.js')
	// 	data = cache
	// } catch (error) {
	// 	const res = await fetch(PUBLIC_HN_API + `/items/35424807`)
	// 	data = await res.json()
	// }

	const res = await fetch(`${PUBLIC_HN_API}/search_by_date?tags=author_whoishiring`)
	data = await res.json()

	return { hits: data.hits }
}
