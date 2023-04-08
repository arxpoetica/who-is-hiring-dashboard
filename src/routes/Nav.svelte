<nav>
	<ul>
		<li><a class="selected" href='.'>home</a></li>
	</ul>
</nav>

<!-- <script></script> -->

<style>
	nav {
		/* border-bottom: 1rem solid $orange-mid; */
		padding: 0 30rem;
		margin: 0 0 50rem;
		background-color: var(--black-1);
	}
	ul {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.selected {
		position: relative;
	}
	.selected::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 3rem;
		background-color: var(--yellow);
		display: block;
		bottom: -1rem;
	}
	a {
		text-decoration: none;
		padding: 10rem 30rem;
		display: block;
		text-align: center;
	}
</style>
