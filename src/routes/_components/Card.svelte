<div class="block">
	<div class="meta">
		<div class="titles">
			<h3><a href="https://news.ycombinator.com/item?id={post.id}" target="_blank">Original Thread</a></h3>
			<h3><a href="https://news.ycombinator.com/user?id={post.author}" target="_blank">Author: {post.author}</a></h3>
		</div>
		<h4>Posted: {dayjs(post.created_at).format('MMMM DD, YYYY @ h:mma')}</h4>
	</div>
	{@html post.text}
</div>

<script>
	export let post
	export let index
	import dayjs from 'dayjs'
</script>

<style type="text/scss">
	.block {
		padding: 2.6rem;
		margin: 0 0 2.6rem;
		background-color: rgba(255, 158, 11, 0.05);
		border: 1px solid $orange-mid;
	}
	.meta {
		padding: 1.2rem;
		background-color: white;
		border: 1px solid #f0f4f5;
		h4 {
			margin: 0;
		}
	}
	.titles {
		display: flex;
		align-items: center;
		h3 {
			margin: 0 1.2rem 0 0;
		}
	}
</style>
