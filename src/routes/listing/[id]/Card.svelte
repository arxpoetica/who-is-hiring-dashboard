<script>
	import { getContext } from 'svelte'
	import dayjs from 'dayjs'
	const { hide, apply, applied } = getContext('storables')

	export let posts
	export let post
	// export let index

	$: hide_state = post.hide
	$: apply_state = post.apply
	$: applied_state = post.applied

	let checked = false
	function toggle_hide() {
		const index = $hide.findIndex(id => id === post.id)
		if (index > -1) {
			hide_state = false
			$hide.splice(index, 1)
			hide.set($hide)
		} else {
			hide_state = true
			hide.set([...$hide, post.id])
		}
		posts = posts // just rejiggering state
	}
	function toggle_apply() {
		const index = $apply.findIndex(id => id === post.id)
		if (index > -1) {
			apply_state = false
			$apply.splice(index, 1)
			apply.set($apply)
		} else {
			apply_state = true
			apply.set([...$apply, post.id])
		}
		posts = posts // just rejiggering state
	}
	function toggle_applied() {
		const index = $applied.findIndex(id => id === post.id)
		if (index > -1) {
			applied_state = false
			$applied.splice(index, 1)
			applied.set($applied)
		} else {
			applied_state = true
			applied.set([...$applied, post.id])
		}
		posts = posts // just rejiggering state
	}
</script>


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
			<label class:on={hide_state}>
				Hide
				<input type="checkbox" bind:checked={post.hide} on:change={toggle_hide}/>
			</label>
			<label class:on={apply_state}>
				To Apply
				<input type="checkbox" bind:checked={post.apply} on:change={toggle_apply}/>
			</label>
			<label class:on={applied_state}>
				Applied To
				<input type="checkbox" bind:checked={post.applied} on:change={toggle_applied}/>
			</label>
		</div>
	</header>
	{@html post.text}
</div>

<style>
	.block {
		padding: 26rem;
		margin: 0 0 26rem;
		background-color: rgba(255, 158, 11, 0.05);
		/* border: 1rem solid $orange-mid; */
		/* font: 22rem/1.4 $font; */
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 12rem;
		background-color: rgba(255, 255, 255, 0.05);
		/* border: 1rem solid $orange-mid; */
	}
	/* .meta {} */
	.titles {
		display: flex;
		align-items: center;
	}
	h3 { margin: 0 12rem 0 0; }
	h4 { margin: 0; }
	.filters {
		display: flex;
		flex-wrap: wrap;
	}
	label {
		display: flex;
		align-items: center;
		margin: 0 0 0 10rem;
		padding: 4rem 12rem;
		border: 1rem solid rgba(255, 158, 11, 0.2);
		cursor: pointer;
		user-select: none;
	}
	label.on {
		/* background-color: $orange-mid; */
	}
	input[type="checkbox"] {
		margin: 2rem 0 0 6rem;
	}
</style>
