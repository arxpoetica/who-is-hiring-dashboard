<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>{title}</h1>
<!-- {JSON.stringify(listing)} -->

<Filters/>
{#if listing}
	<!-- {#each filteredComments as comment, index} -->
	{#each listing.children as post, index}
		<Card {post} {index}/>
	{/each}
{/if}

<script>
	let listing
	$: title = listing ? listing.title : 'Loading...'

	import { stores } from '@sapper/app'
	import { onMount } from 'svelte'
	import { fetchHN } from '../../server/loaders'
	import Filters from '../_components/Filters.svelte'
	import Card from '../_components/Card.svelte'

	const { page } = stores()
	onMount(async () => {
		const res = await fetchHN(`items/${$page.params.id}`)
		listing = await res.json()
		console.log(listing)


		// const docs = await db.allDocs({
		// 	include_docs: true,
		// 	keys: post.kids.map(id => id.toString()),
		// })
		// comments = docs.rows
		// 	.filter(row => !row.error)
		// 	.map(row => {
		// 		row.doc.searchText = typeof row.doc.text === 'string' ? row.doc.text.replace(/\s\s+/g, ' ').toLowerCase() : ''
		// 		return row.doc
		// 	})
		// 	.sort((rowA, rowB) => rowA.time - rowB.time)
		// // console.log(comments)


	})

	// let comments = []
	// let filters, filteredComments
	// $: {
	// 	filters = filterSet.filter(set => set.on && set.value !== '').map(set => set.value)
	// 	filteredComments = filters.length ? comments.filter(comment => {
	// 		return filters.filter(filter => filter ? comment.searchText.indexOf(filter) > -1 : false).length
	// 	}) : comments
	// }

</script>

<!-- <style type="text/scss"></style> -->
