<main>
	<Nav {segment}/>
	<slot></slot>
</main>

<script>
	import Nav from '../components/Nav.svelte'
	export let segment
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 0 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
