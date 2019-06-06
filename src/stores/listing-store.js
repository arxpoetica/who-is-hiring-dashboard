import { writable } from 'svelte/store'

export const query = writable('')

export const filterSet = writable([
	{ value: 'remote', label: 'Remote', on: false },
	{ value: 'remote only', label: 'Remote Only', on: false },
	{ value: 'onsite', label: 'Onsite', on: false },
	{ value: 'intern', label: 'Intern', on: false },
	{ value: 'visa', label: 'Visa', on: false },
])

export const tags = [
	'remote',
	'remote only',
	'onsite',
	'interns',
	'visa',
]
