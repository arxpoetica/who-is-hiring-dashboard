<div class="block">
	<header>
		<div class="meta">
			<div class="titles">
				<h3><a href="https://news.ycombinator.com/item?id={post.id}" target="_blank">Original Thread</a></h3>
				<h3><a href="https://news.ycombinator.com/user?id={post.author}" target="_blank">Author: {post.author}</a></h3>
			</div>
			<h4>Posted: {dayjs(post.created_at).format('MMMM DD, YYYY @ h:mma')}</h4>
		</div>
		<div class="filters">
			<label class={hideState ? 'on': ''}>
				Hide
				<input type="checkbox" bind:checked={post.hide} on:change={toggleHide}/>
			</label>
			<label class={applyState ? 'on': ''}>
				To Apply
				<input type="checkbox" bind:checked={post.apply} on:change={toggleApply}/>
			</label>
			<label class={appliedState ? 'on': ''}>
				Applied To
				<input type="checkbox" bind:checked={post.applied} on:change={toggleApplied}/>
			</label>
		</div>
	</header>
	{@html post.text}
</div>

<script>
	import { onMount } from 'svelte'
	export let posts
	export let post
	export let index

	let hideState = false
	let applyState = false
	let appliedState = false

	import { getContext } from 'svelte'
	import dayjs from 'dayjs'
	const { hide, apply, applied } = getContext('storables')

	onMount(() => {
		hideState = post.hide
		applyState = post.apply
		appliedState = post.applied
	})

	let checked = false
	function toggleHide() {
		const index = $hide.findIndex(id => id === post.id)
		if (index > -1) {
			hideState = false
			$hide.splice(index, 1)
			hide.set($hide)
		} else {
			hideState = true
			hide.set([...$hide, post.id])
		}
		posts = posts // just rejiggering state
	}
	function toggleApply() {
		const index = $apply.findIndex(id => id === post.id)
		if (index > -1) {
			applyState = false
			$apply.splice(index, 1)
			apply.set($apply)
		} else {
			applyState = true
			apply.set([...$apply, post.id])
		}
		posts = posts // just rejiggering state
	}
	function toggleApplied() {
		const index = $applied.findIndex(id => id === post.id)
		if (index > -1) {
			appliedState = false
			$applied.splice(index, 1)
			applied.set($applied)
		} else {
			appliedState = true
			applied.set([...$applied, post.id])
		}
		posts = posts // just rejiggering state
	}
</script>

<style type="text/scss">
	.block {
		padding: 2.6rem;
		margin: 0 0 2.6rem;
		background-color: rgba(255, 158, 11, 0.05);
		border: 1px solid $orange-mid;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1.2rem;
		background-color: white;
		border: 1px solid $gray-light;
	}
	// .meta {}
	.titles {
		display: flex;
		align-items: center;
	}
	h3 { margin: 0 1.2rem 0 0; }
	h4 { margin: 0; }
	.filters {
		display: flex;
		flex-wrap: wrap;
	}
	label {
		display: flex;
		align-items: center;
		margin: 0 0 0 1rem;
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
</style>
