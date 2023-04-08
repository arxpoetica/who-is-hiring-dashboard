<main>
	<Nav/>
	<slot></slot>
</main>

<script>
	import './app.css'
	import Nav from './Nav.svelte'
</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		position: relative;
		max-width: 1000rem;
		padding: 0 20rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
