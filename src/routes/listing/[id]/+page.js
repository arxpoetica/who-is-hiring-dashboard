import { get } from 'svelte/store'
import { browser } from '$app/environment'
import { storable } from '$lib/stores/local-store'

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {

	const listing = storable(`listing.${params.id}`)
	let data = get(listing)

	if (!data && browser) {
		const res = await fetch(`/api/listing/${params.id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		})
		data = await res.json()
		listing.set(data)
	}

	return { listing: data }
}
