<script>
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	import { production } from '$lib/stores';
	import { customFetch as fetch } from '$lib/injectedFetch';

	let productions = [];
	let shuttingDown = false;

	const getProductions = async () => {
		const response = await fetch(`${env.PUBLIC_API_URL}/scanner/productions`, {
			credentials: 'include'
		});
		const data = await response.json();
		productions = data.data;
	};
	getProductions();
</script>

{#if shuttingDown}
	<div class="popBg">
		<div class="pop">
			<p>Weet je zeker dat je wilt afsluiten?</p>

			<button
				on:click={() => {
					goto('/shutdown');
				}}
			>
				Ja
			</button>
			<button
				on:click={() => {
					shuttingDown = false;
				}}>Nee</button
			>
		</div>
	</div>
{/if}

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

	<button
		class="back"
		on:click={() => {
			shuttingDown = true;
		}}
	>
		Afsluiten
	</button>
</div>

<style>
	.popBg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.pop {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		border-radius: 10px;
		padding: 20px;
		height: 200px;
		width: 270px;
		display: flex;
		flex-direction: column;
	}

	.pop p {
		margin: 0;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
	}

	.pop button {
		margin: 10px;
		border: 1px solid #11b4e2;
		padding: 10px 20px;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		background-color: #11b4e2;
		color: white;
		border-radius: 5px;
		cursor: pointer;
	}

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
