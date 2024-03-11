<script>
	export let data;
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { production } from '$lib/stores';

	const getProduction = async () => {
		const response = await fetch(`${env.PUBLIC_API_URL}/scanner/productions/${data.id}`);
		const res = await response.json();
		$production = res.data;
	};

	getProduction();
</script>

<div class="bg">
	<img src="/logo.png" class="logo" />
	<h1 class="productionName">{$production?.name || ''}</h1>
	<slot />
	<button class="back" on:click={() => window.history.back()}>Terug</button>
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

	.productionName {
		/*top right*/
		position: absolute;
		top: 4%;
		right: 5%;
		color: white;
		font-size: 25px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
	}

	.back {
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #f2f2f2;
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		cursor: pointer;
		width: 80%;
	}
</style>
