<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Who Is Hiring?</h1>

<!-- {JSON.stringify(listing)} -->

<div class="filters">
	<div class="filters-set">
		{#each filterSet as filter, index}
			{#if index === 0}
				<label class="search {filter.value ? 'on': ''}">
					{filter.label}
					<input type="text" bind:value={filter.value}/>
				</label>
			{:else}
				<label class="{filter.on ? 'on': ''}">
					{filter.label}
					<input type="checkbox" bind:checked={filter.on}/>
				</label>
			{/if}
		{/each}
	</div>
	<div class="meta">
		<!-- {#if filteredComments.length}
			<div class="selected">Filtered count: {filteredComments.length}</div>
		{/if} -->
	</div>
</div>

{#if listing}
	<!-- {#each filteredComments as comment, index} -->
	{#each listing.children as post, index}
		<div class="block">
			<!-- <h2><a href="https://news.ycombinator.com/user?id={post.by}" target="_blank">{post.by}</a></h2> -->
			{@html post.text}
		</div>
	{/each}
{/if}

<script>
	let listing

	import { stores } from '@sapper/app'
	import { onMount } from 'svelte'
	import { fetchHN } from '../../server/loaders'

	let filterSet = [
		{ value: '', label: 'Search', on: true },
		{ value: 'remote', label: 'Remote', on: false },
		{ value: 'remote only', label: 'Remote Only', on: false },
		{ value: 'onsite', label: 'Onsite', on: false },
		{ value: 'interns', label: 'Interns', on: false },
		{ value: 'visa', label: 'Visa', on: false },
	]

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

<style type="text/scss">
	.block {
		border: 1px solid #f0f4f5;
		padding: 2.6rem;
		margin: 0 0 2.6rem;
		background-color: rgba(255, 158, 11, 0.05);
	}
	.filters {
		margin: 0 0 2.6rem;
	}
	.filters-set {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		border: 1px solid #f0f4f5;
		padding: 1rem;
	}
	label {
		display: flex;
		align-items: center;
		margin: 0 1rem 0 0;
		padding: 0.4rem 1.2rem;
		border: 1px solid rgba(255, 158, 11, 0.2);
		cursor: pointer;
	}
	label.on {
		background-color: rgba(255, 158, 11, 0.05);
	}
	input[type="checkbox"] {
		margin: 0.2rem 0 0 0.6rem;
	}
	label.search {
		position: relative;
		padding-right: 17rem;
	}
	label.search input[type="text"] {
		position: absolute;
		top: -0.1rem;
		right: -0.1rem;
		height: 100%;
		width: 15rem;
		margin: 0 0 0 0.6rem;
		padding: 0 0.4rem;
		border: 1px solid rgba(255, 158, 11, 0.2);
	}
	.meta {
		padding: 1.1rem;
	}
	.selected {
		margin-right: 1rem;
	}
</style>
