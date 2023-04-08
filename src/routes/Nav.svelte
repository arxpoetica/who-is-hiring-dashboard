<nav>
	<ul>
		<li><a class="selected" href='.'>home</a></li>
	</ul>
</nav>

<!-- <script></script> -->

<style type="text/scss">
	nav {
		/* border-bottom: 1rem solid $orange-mid; */
		padding: 0 30rem;
		margin: 0 0 50rem;
		background-color: rgba(255, 158, 11, 0.1);
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
		background-color: rgb(255, 158, 11);
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
