<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		fetch('/api/shutdown');
	});
</script>

<div class="bg">
	<img src="/logo.png" class="logo" />
	<h1 class="text">doegdoeg!</h1>
</div>

<style>
	.bg {
		background-color: #11b4e2;
		width: 100%;
		height: 100%;
	}

	.logo {
		width: 80px;
		height: 80px;
		position: absolute;
		top: 10%;
		left: 15%;
		transform: translate(-50%, -50%);
	}

	.text {
		position: absolute;
		top: 25%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 30px;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		text-align: center;
	}

	.productions {
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.production {
		margin: 0 10px;
		padding: 10px 20px;
		width: 70%;
		margin-bottom: 10px;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		background-color: white;
		border-radius: 10px;
		cursor: pointer;
	}

	.back {
		position: absolute;
		bottom: 15px;
		width: 40%;
		text-align: center;
		margin: 0 10px;
		padding: 10px 20px;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		background-color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
