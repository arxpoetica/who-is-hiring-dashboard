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

export const languageSet = storable('languageSet', [
	{ value: 'css', label: 'CSS', on: false },
	{ value: 'html', label: 'HTML', on: false },
	{ value: 'java', label: 'Java', on: false },
	{ value: 'javascript', label: 'JavaScript', on: false },
	{ value: 'php', label: 'PHP', on: false },
	{ value: 'python', label: 'Python', on: false },
	{ value: 'ruby', label: 'Ruby', on: false },
])

export const settings = storable('setting', [
	{ value: 'apply', label: 'To Apply', on: false },
	{ value: 'applied', label: 'Applied To', on: false },
	{ value: 'hidden', label: 'Show Hidden', on: false },
	{ value: 'hiddenonly', label: 'Show Hidden Only', on: false },
])

// TODO: apply these to *each* listing, so we're saving for all, and not overwriting
export const hide = storable('hide', [])
export const apply = storable('apply', [])
export const applied = storable('applied', [])
