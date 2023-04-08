<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1 class:listing>
	{#if listing}
		{listing.title}
	{:else}
		. . . loading . . .
		<div class="svgs">
			<div class="svg"><Loader/></div>
		</div>
	{/if}
</h1>
{#if listing}
	<Filters {posts} {filtered_posts}/>
	{#each filtered_posts as post, index (post.id)}
		<!-- <Card {post} {index} {hide} {apply} {applied}/> -->
		<Card bind:posts {post} {index}/>
	{/each}
{/if}

<script>
	import { stores } from '@sapper/app'
	import { onMount, setContext } from 'svelte'
	import { fetchHN } from '../../../server/loaders'
	import { storable } from '../../../stores/local-store'
	import { query, filter_set, language_set, settings } from '../../../stores/listing-store'
	import Loader from '../../_svg/Loader.svelte'
	import Filters from '../../_components/Filters.svelte'
	import Card from '../../_components/Card.svelte'

	const { page } = stores()
	const hide = storable(`hide.${$page.params.id}`, [])
	const apply = storable(`apply.${$page.params.id}`, [])
	const applied = storable(`applied.${$page.params.id}`, [])
	setContext('storables', { hide, apply, applied })

	let listing
	let posts = []

	$: has_query = $query.length > 2
	$: show_hidden = $settings.find(setting => setting.value === 'hidden').on
	$: show_applied_only = $settings.find(setting => setting.value === 'appliedonly').on
	$: show_apply_only = $settings.find(setting => setting.value === 'applyonly').on
	$: show_hidden_only = $settings.find(setting => setting.value === 'hiddenonly').on
	$: show_to_apply = $settings.find(setting => setting.value === 'apply').on
	$: show_applied_to = $settings.find(setting => setting.value === 'applied').on
	$: languages = $language_set.filter(set => set.on).map(set => set.value)
	$: filters = $filter_set.filter(set => set.on).map(set => set.value)
	$: filtered_posts = posts.filter(post => {
		let show = true
		if (has_query) {
			show = show && post.searchText.indexOf($query) > -1
		}
		console.log(show_applied_only)
		if (show_applied_only) {
			show = show && post.applied
		} else if (show_apply_only) {
			show = show && post.apply
		} else if (show_hidden_only) {
			show = show && post.hide
		} else {
			show = show && (show_hidden ? true : !post.hide)
			show = show && (show_to_apply ? true : !post.apply)
			show = show && (show_applied_to ? true : !post.applied)
		}
		if (languages.length) {
			const found = languages.filter(language => post.languages.indexOf(language) > -1)
			show = show && (found.length === languages.length)
		}
		if (filters.length) {
			const found = filters.filter(filter => post.tags.indexOf(filter) > -1)
			show = show && (found.length === filters.length)
		}
		return show
	})

	onMount(async () => {
		const res = await fetchHN(`items/${$page.params.id}`)
		listing = await res.json()
		// console.log(listing)

		const tags = $filter_set.map(set => set.value)
		const languagesTags = $language_set.map(set => set.value)

		posts = listing.children.map(post => {
			// just indexing and optimizing for faster search / filter
			post.text = typeof post.text === 'string' ? post.text.replace(/\<a /gi, '<a target="_blank" ') : ''
			const doc = new DOMParser().parseFromString(post.text, 'text/html')
			post.searchText = doc.body.textContent.replace(/\s\s+/g, ' ').toLowerCase()
			post.tags = tags.filter(tag => post.searchText.indexOf(tag) > -1)
			post.languages = languagesTags.filter(tag => post.searchText.indexOf(tag) > -1)
			post.hide = $hide.indexOf(post.id) > -1
			post.apply = $apply.indexOf(post.id) > -1
			post.applied = $applied.indexOf(post.id) > -1
			return post
		})
	})
</script>

<style type="text/scss">
	h1 {
		margin: 12rem;
		text-align: center;
		&.listing {
			text-align: left;
		}
	}
	.svgs {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 100rem 0 0;
	}
	.svg {
		min-width: 400rem;
		margin: 25rem;
		line-height: 0;
		color: red;
	}
</style>
