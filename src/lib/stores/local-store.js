/* global window */
import { browser } from '$app/environment'
import { writable } from 'svelte/store'
// import { uneval, parse } from 'devalue'

export const storable = (key = 'default', value = undefined) => {

	// quick guard against server
	if (!browser) { return writable(value) }

	key = `hn.store.${key}`
	if (window.localStorage[key] && typeof window.localStorage[key] === 'string') {
		value = JSON.parse(window.localStorage[key])
	}

	const store = Object.assign(
		writable(value), { remove: () => store.set(undefined) }
	)

	store.subscribe(value => {
		if (value === undefined) {
			window.localStorage.removeItem(key)
		} else {
			// window.localStorage[key] = uneval(value)
			window.localStorage[key] = JSON.stringify(value)
		}
	})

	return store
}
