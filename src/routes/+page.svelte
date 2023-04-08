<script>
	export let data
	$: hits = data?.hits
	// $: console.table(hits)
</script>

<h1>Who is Hiring Dashboard</h1>
<!-- {JSON.stringify(hits)} -->
<div class="hits">
	{#each hits as hit}
		<div class="hit">
			<!-- <h2><a href="https://news.ycombinator.com/item?id={hit.objectID}">{hit.title}</a></h2> -->
			<h2><a href="/listing/{hit.objectID}">{hit.title}</a></h2>
		</div>
	{/each}
</div>

<style>
	.hits {
		display: grid;
		gap: 2rem;
		margin: 0 0 20rem;
	}
	.hit {
		padding: 8rem 20rem;
		background-color: var(--black-1);
	}
	h2 {
		margin: 0;
	}
</style>
