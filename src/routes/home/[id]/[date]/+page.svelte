<script>
	import { goto } from '$app/navigation';
	import { production, date } from '$lib/stores';
	import { customFetch as fetch } from '$lib/injectedFetch';
</script>

<div class="bg">
	<h1 class="text">Welkom!</h1>
	<div class="options">
		<div class="option" on:click={() => goto(`/home/${$production.id}/${$date.id}/scanner`)}>
			Scanner
		</div>
		<div class="option" on:click={() => goto(`/home/${$production.id}/${$date.id}/scanned`)}>
			Gescanned
		</div>
	</div>
</div>

<style>
	.bg {
		background-color: #11b4e2;
		width: 100%;
		height: 100%;
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

	.options {
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

	.option {
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
</style>
