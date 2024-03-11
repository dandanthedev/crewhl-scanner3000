<script>
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import { production } from '$lib/stores';
	let productions = [];

	const getProductions = async () => {
		const response = await fetch(`${env.PUBLIC_API_URL}/scanner/productions`, {
			credentials: 'include'
		});
		const data = await response.json();
		productions = data.data;
	};
	getProductions();
</script>

<div class="bg">
	<img src="/logo.png" class="logo" />
	<h1 class="text">Kies productie</h1>

	<div class="productions">
		{#each productions as productionElem}
			<div
				class="production"
				on:click={() => {
					goto(`/home/${productionElem.id}`);
					$production = productionElem;
				}}
			>
				{productionElem.name}
			</div>
		{/each}
	</div>
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
</style>
