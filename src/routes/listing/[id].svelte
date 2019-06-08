<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>{title}</h1>
<Filters {posts} {filteredPosts}/>
{#each filteredPosts as post, index}
	<Card {post} {index}/>
{/each}

<script>
	import { stores } from '@sapper/app'
	import { onMount } from 'svelte'
	import { fetchHN } from '../../server/loaders'
	import { query, filterSet, settings, tags, hide, apply } from '../../stores/listing-store'
	import Filters from '../_components/Filters.svelte'
	import Card from '../_components/Card.svelte'

	let listing

	$: title = listing ? listing.title : 'Loading...'
	$: posts = listing ? listing.children.map(post => {
		// just indexing and optimizing for faster search / filter
		const doc = new DOMParser().parseFromString(post.text, 'text/html')
		post.searchText = doc.body.textContent.replace(/\s\s+/g, ' ').toLowerCase()
		post.tags = tags.filter(tag => post.searchText.indexOf(tag) > -1)
		post.hide = $hide.indexOf(post.id) > -1
		post.apply = $apply.indexOf(post.id) > -1
		return post
	}) : []

	$: filters = $filterSet.filter(set => set.on).map(set => set.value)

	$: queryPosts = $query.length > 2
		? posts.filter(post => post.searchText.indexOf($query) > -1)
		: posts

	$: showHidden = $settings.find(setting => setting.value === 'hidden').on
	$: settingsPosts = queryPosts.filter(post => {
		let show = showHidden ? true : !post.hide
		return show
	})

	$: filteredPosts = filters.length
		? settingsPosts.filter(post => {
			const found = filters.filter(filter => post.tags.indexOf(filter) > -1)
			return found.length === filters.length
		})
		: settingsPosts

	const { page } = stores()
	onMount(async () => {
		const res = await fetchHN(`items/${$page.params.id}`)
		listing = await res.json()
		console.log(listing)
	})
</script>

<style type="text/scss">
	h1 {
		margin: 1.2rem;
	}
</style>
