<h1>Who is Hiring Dashboard</h1>

<div class="posts">
	{#each posts as post}
		<div class="post">
			<!-- <h2><a href="https://news.ycombinator.com/item?id={post.objectID}">{post.title}</a></h2> -->
			<h2><a href="/listing/{post.objectID}">{post.title}</a></h2>
		</div>
	{/each}
</div>

<script context="module">
	import { GET } from '../server/loaders'
	export async function preload() {
		const data = await GET('//hn.algolia.com/api/v1/search_by_date?tags=author_whoishiring')
		return { posts: data.hits }
	}
</script>

<script>
	export let posts = []
</script>

<style type="text/scss">
	.post {
		margin: 0 0 2rem;
	}
</style>
