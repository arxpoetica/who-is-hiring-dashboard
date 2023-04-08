import { PUBLIC_HN_API } from '$env/static/public'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`${PUBLIC_HN_API}/search_by_date?tags=author_whoishiring`)
	const data = await res.json()

	return { hits: data.hits }
}
