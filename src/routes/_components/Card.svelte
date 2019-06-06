<div class="block">
	<!-- <h2><a href="https://news.ycombinator.com/user?id={post.by}" target="_blank">{post.by}</a></h2> -->
	{@html post.text}
</div>

<script>
	export let post
	export let index
</script>

<style type="text/scss">
	.block {
		border: 1px solid #f0f4f5;
		padding: 2.6rem;
		margin: 0 0 2.6rem;
		background-color: rgba(255, 158, 11, 0.05);
	}
</style>
