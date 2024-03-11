<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	let confirmMsg = '';
	let confirmAction = () => {};
	let msg = 'Er is een update beschikbaar.';
	let showButtons = true;
</script>

{#if confirmMsg}
	<div class="confirm" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
		<p>{confirmMsg}</p>
		<div class="btns">
			<button
				on:click={async () => {
					await confirmAction();
					confirmMsg = '';
				}}>Ja</button
			>
			<button
				on:click={() => {
					confirmMsg = '';
				}}>Nee</button
			>
		</div>
	</div>
{/if}

<div class="bg">
	<img src="/logo.png" class="logo" />
	<h1 class="text">Scanner 3000</h1>

	<p class="msg">{msg}</p>

	{#if showButtons}
		<div class="btns">
			<button
				on:click={async () => {
					showButtons = false;
					msg = 'Update wordt uitgevoerd, dit kan even duren...';
					await fetch('/api/update');
				}}>Update</button
			>
			<button
				on:click={() => {
					confirmMsg = 'Weet je zeker dat je de update later wilt uitvoeren?';
					confirmAction = async () => {
						goto('/home');
						await new Promise((resolve) => {});
					};
				}}>Later</button
			>
		</div>
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

	.msg {
		position: absolute;
		top: 65%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		text-align: center;
	}

	.btns {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		text-align: center;
	}

	button {
		margin: 0 10px;
		padding: 10px 20px;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		background-color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.confirm {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		z-index: 100;
	}

	.confirm p {
		font-size: 30px;
		text-align: center;
		color: white;
		font-family: 'Roboto', sans-serif;
	}
</style>
