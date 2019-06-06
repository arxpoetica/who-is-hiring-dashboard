<h1>Who is Hiring Dashboard</h1>

<!-- {JSON.stringify(posts)} -->

<div class="posts">
	{#each posts as post}
		<div class="post">
			<!-- <h2><a href="https://news.ycombinator.com/item?id={post.objectID}">{post.title}</a></h2> -->
			<h2><a href="/listing/{post.objectID}">{post.title}</a></h2>
		</div>
	{/each}
</div>

<script>
	export let posts = []
	import { onMount } from 'svelte'
	import { fetchHN } from '../server/loaders'

	onMount(async () => {
		const res = await fetchHN('search_by_date?tags=author_whoishiring')
		posts = (await res.json()).hits
	})
</script>

<style type="text/scss">
	.post {
		margin: 0 0 2rem;
	}
</style>
