<script>
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	let error;
	let msg = 'Verbinden...';
	onMount(() => {
		fetch(`${env.PUBLIC_API_URL}/scanner/ping`)
			.then((response) => {
				if (!response.ok) return (error = 'Kon geen verbinding maken met server.');
				msg = 'Controleren op updates...';
				fetch('/api/checkUpdates').then((response) => {
					if (response.ok) {
						response.json().then((data) => {
							if (data.data === true) {
								goto('/update');
							} else if (data.data === null) {
								msg = 'Kon niet controleren op updates.';
							} else {
								goto('/home');
							}
						});
					}
				});
			})
			.catch(() => {
				return (error = 'Kon geen verbinding maken met server.');
			});
	});
</script>

<div class="bg">
	<img src="/logo.png" class="logo" />
	<h1 class="text">Scanner 3000</h1>
	{#if !error}
		<p class="loading">{msg}</p>
	{:else}
		<p class="loading error">{error}</p>
	{/if}
</div>

<style>
	.bg {
		background-color: #11b4e2;
		width: 100%;
		height: 100%;
	}

	.logo {
		width: 200px;
		height: 200px;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.text {
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 40px;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		text-align: center;
	}

	.loading {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		text-align: center;
	}
</style>
