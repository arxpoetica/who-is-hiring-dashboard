<div class="filters">
	<div class="filters-set">
		<label class="search {$query.length > 2 ? 'on': ''}">
			Search
			<input type="text" bind:value={$query}/>
		</label>
		{#each $filterSet as filter, index}
			<label class="{filter.on ? 'on': ''}">
				{filter.label}
				<input type="checkbox" bind:checked={$filterSet[index].on}/>
			</label>
		{/each}
	</div>
	<div class="meta">
		<div class="stat">Total: {posts.length}</div>
		{#if filteredPosts.length}
			<div class="stat">Filtered: {filteredPosts.length}</div>
		{/if}
	</div>
</div>

<script>
	export let posts = []
	export let filteredPosts = []
	import { query, filterSet } from '../../stores/listing-store'
</script>

<style type="text/scss">
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
		&.on {
			background-color: $orange-mid;
		}
		&.search {
			position: relative;
			padding-right: 17rem;
			input[type="text"] {
				position: absolute;
				top: -0.1rem;
				right: -0.1rem;
				height: 100%;
				width: 15rem;
				margin: 0 0 0 0.6rem;
				padding: 0 0.4rem;
				border: 1px solid rgba(255, 158, 11, 0.2);
			}
		}
	}
	input[type="checkbox"] {
		margin: 0.2rem 0 0 0.6rem;
	}
	.meta {
		display: flex;
		align-items: center;
		padding: 1.1rem;
	}
	.stat {
		margin-right: 1rem;
	}
</style>
