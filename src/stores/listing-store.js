import { writable } from 'svelte/store'
import { storable } from './local-store'

export const query = writable('')

export const filter_set = storable('filter_set', [
	{ value: 'remote', label: 'Remote', on: false },
	{ value: 'remote only', label: 'Remote Only', on: false },
	{ value: 'onsite', label: 'Onsite', on: false },
	{ value: 'intern', label: 'Intern', on: false },
	{ value: 'visa', label: 'Visa', on: false },
])

export const language_set = storable('language_set', [
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
	{ value: 'applyonly', label: 'To Apply Only', on: false },
	{ value: 'appliedonly', label: 'Applied To Only', on: false },
	{ value: 'hiddenonly', label: 'Hidden Only', on: false },
])
