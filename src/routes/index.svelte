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
	export async function preload({ params }) {
		const res = await this.fetch('https://hn.algolia.com/api/v1/search_by_date?tags=author_whoishiring', {
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await res.json()
		console.log(data)
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
