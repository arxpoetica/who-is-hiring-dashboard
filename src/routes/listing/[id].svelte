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
			<div class="svg"><Loader/></div>
			<div class="svg"><Loader/></div>
		</div>
	{/if}
</h1>
{#if listing}
	<Filters {posts} {filteredPosts}/>
	{#each filteredPosts as post, index}
		<Card {post} {index}/>
	{/each}
{/if}

<script>
	import { stores } from '@sapper/app'
	import { onMount } from 'svelte'
	import { fetchHN } from '../../server/loaders'
	import { query, filterSet, languageSet, settings, hide, apply, applied } from '../../stores/listing-store'
	import Loader from '../_svg/Loader.svelte'
	import Filters from '../_components/Filters.svelte'
	import Card from '../_components/Card.svelte'

	let listing
	let posts = []

	$: hasQuery = $query.length > 2
	$: showHidden = $settings.find(setting => setting.value === 'hidden').on
	$: showHiddenOnly = $settings.find(setting => setting.value === 'hiddenonly').on
	$: showToApply = $settings.find(setting => setting.value === 'apply').on
	$: showAppliedTo = $settings.find(setting => setting.value === 'applied').on
	$: languages = $languageSet.filter(set => set.on).map(set => set.value)
	$: filters = $filterSet.filter(set => set.on).map(set => set.value)
	$: filteredPosts = posts.filter(post => {
		let show = true
		if (hasQuery) {
			show = show && post.searchText.indexOf($query) > -1
		}
		if (showHiddenOnly) {
			show = show && post.hide
		} else {
			show = show && (showHidden ? true : !post.hide)
			show = show && (showToApply ? post.apply : true)
			show = show && (showAppliedTo ? post.applied : true)
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

	const { page } = stores()
	onMount(async () => {
		const res = await fetchHN(`items/${$page.params.id}`)
		listing = await res.json()
		console.log(listing)

		const tags = $filterSet.map(set => set.value)
		const languagesTags = $languageSet.map(set => set.value)

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
		margin: 1.2rem;
		text-align: center;
		&.listing {
			text-align: left;
		}
	}
	.svgs {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10rem 0 0;
	}
	.svg {
		min-width: 20rem;
		margin: 2.5rem;
		line-height: 0;
	}
</style>
