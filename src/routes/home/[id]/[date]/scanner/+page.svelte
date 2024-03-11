<script>
	export let data;
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { env } from '$env/dynamic/public';

	let scanning = false;

	let html5Qrcode;

	let scanError;
	let scanData;

	onMount(init);
	async function onScanSuccess(decodedText) {
		if (!scanning) return;
		scanning = false;
		console.log(decodedText);

		const res = await fetch(
			`${env.PUBLIC_API_URL}/scanner/scan/${data.date}?barcode=${decodedText}`
		);

		const json = await res.json();
		console.log(json);

		if (json.error) {
			scanError = json.error;
		} else {
			scanData = json.data;
		}

		await new Promise((resolve) => setTimeout(resolve, 3000));

		scanError = null;
		scanData = null;

		scanning = true;
	}
	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 240, height: 250 }
			},
			onScanSuccess
		);
		scanning = true;
	}
</script>

<main>
	<div class="readerContainer">
		<reader class="reader" id="reader"></reader>
		{#if !scanning}
			<div class="readerOverlay" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
				{#if scanError}
					<p>{scanError}</p>
				{/if}
				{#if scanData}
					<p>{scanData.name}</p>
				{/if}
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	.readerContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	reader {
		margin-top: 100px;
		width: 290px;
		display: flex;
		justify-content: center;
		border: 10px solid white;
	}

	.readerOverlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
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
