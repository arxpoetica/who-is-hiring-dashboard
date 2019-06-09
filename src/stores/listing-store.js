import { writable } from 'svelte/store'
import { storable } from './local-store'

export const query = writable('')

export const filterSet = storable('filterSet', [
	{ value: 'remote', label: 'Remote', on: false },
	{ value: 'remote only', label: 'Remote Only', on: false },
	{ value: 'onsite', label: 'Onsite', on: false },
	{ value: 'intern', label: 'Intern', on: false },
	{ value: 'visa', label: 'Visa', on: false },
])

export const settings = storable('setting', [
	{ value: 'apply', label: 'To Apply', on: true },
	{ value: 'applied', label: 'Applied To', on: true },
	{ value: 'hidden', label: 'Show Hidden', on: false },
	{ value: 'hiddenonly', label: 'Show Hidden Only', on: false },
])

export const tags = [
	'remote',
	'remote only',
	'onsite',
	'interns',
	'visa',
]

export const hide = storable('hide', [])
export const apply = storable('apply', [])
export const applied = storable('applied', [])
