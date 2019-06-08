<div class="filters">
	<div class="all-filters">
		<label class="search {$query.length > 2 ? 'on': ''}">
			Search
			<input type="text" bind:value={$query} placeholder="for text on the page..."/>
		</label>
		<div class="filters-set">
			{#each $settings as setting, index}
				<label class="{setting.on ? 'on': ''}">
					{setting.label}
					<input type="checkbox" bind:checked={$settings[index].on}/>
				</label>
			{/each}
		</div>
		<div class="filters-set">
			{#each $filterSet as filter, index}
				<label class="{filter.on ? 'on': ''}">
					{filter.label}
					<input type="checkbox" bind:checked={$filterSet[index].on}/>
				</label>
			{/each}
		</div>
	</div>
	<div class="meta">
		<div class="stat">Total: {posts.length}</div>
		{#if filteredPosts.length < posts.length}
			<div class="stat">Filtered: {filteredPosts.length}</div>
		{/if}
	</div>
</div>

<script>
	export let posts = []
	export let filteredPosts = []
	import { query, filterSet, settings } from '../../stores/listing-store'
</script>

<style type="text/scss">
	.filters {
		margin: 0 0 2.6rem;
	}
	.all-filters {
		border: 1px solid $gray-light;
		padding: 1rem;
	}
	.search {
		justify-content: flex-start;
		position: relative;
		margin: 0;
		padding: 0 1.2rem;
	}
	input[type="text"] {
		flex: 1;
		margin: 0.4rem 0 0.4rem 0.6rem;
		padding: 0 0.6rem;
		border: 1px solid $gray-light;
		box-shadow: inset 0 0 4px $gray-light;
		font: inherit;
	}
	.filters-set {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	label {
		display: flex;
		align-items: center;
		margin: 1rem 1rem 0 0;
		padding: 0.4rem 1.2rem;
		border: 1px solid rgba(255, 158, 11, 0.2);
		cursor: pointer;
		user-select: none;
		&.on {
			background-color: $orange-mid;
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
