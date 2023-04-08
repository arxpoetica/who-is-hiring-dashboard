<div class="filters">
	<div class="all-filters">
		<label class="search" class:on={$query.length > 2}>
			Search
			<input type="text" bind:value={$query} placeholder="for text on the page..."/>
		</label>
		<div class="filters-set">
			{#each $settings as setting, index}
				<label class:on={setting.on}>
					{setting.label}
					<input type="checkbox" bind:checked={$settings[index].on}/>
				</label>
			{/each}
		</div>
		<div class="filters-set">
			{#each $filter_set as filter, index}
				<label class:on={filter.on}>
					{filter.label}
					<input type="checkbox" bind:checked={$filter_set[index].on}/>
				</label>
			{/each}
		</div>
		<div class="filters-set">
			{#each $language_set as language, index}
				<label class:on={language.on}>
					{language.label}
					<input type="checkbox" bind:checked={$language_set[index].on}/>
				</label>
			{/each}
		</div>
	</div>
	<div class="meta">
		<div class="stat">Total: {posts.length}</div>
		{#if filtered_posts.length < posts.length}
			<div class="stat">Filtered: {filtered_posts.length}</div>
		{/if}
	</div>
</div>

<script>
	export let posts = []
	export let filtered_posts = []
	import { query, filter_set, language_set, settings } from '../../lib/stores/listing-store'
</script>

<style>
	.filters {
		margin: 0 0 26rem;
	}
	.all-filters {
		border: 1rem solid $orange-mid;
		padding: 10rem;
	}
	.search {
		justify-content: flex-start;
		position: relative;
		margin: 0;
		padding: 0 12rem;
	}
	input[type="text"] {
		flex: 1;
		margin: 4rem 0 4rem 6rem;
		padding: 0 6rem;
		border: 1rem solid $orange-mid;
		box-shadow: inset 0 0 4rem $orange-mid;
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
		margin: 10rem 10rem 0 0;
		padding: 4rem 12rem;
		border: 1rem solid rgba(255, 158, 11, 0.2);
		cursor: pointer;
		user-select: none;
		&.on {
			background-color: $orange-mid;
		}
	}
	input[type="checkbox"] {
		margin: 2rem 0 0 6rem;
		cursor: pointer;
	}
	.meta {
		display: flex;
		align-items: center;
		padding: 11rem;
	}
	.stat {
		margin-right: 10rem;
	}
</style>
