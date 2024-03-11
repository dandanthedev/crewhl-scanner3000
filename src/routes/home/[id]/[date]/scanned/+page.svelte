<script>
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { fade } from 'svelte/transition';

	export let data;
	let tickets = [];
	let shownTickets = [];
	let page = 1;

	let confirmMsg = '';
	let confirmAction = () => {};

	onMount(async () => {
		const response = await fetch(`${env.PUBLIC_API_URL}/scanner/scanned/${data.date}`);
		const res = await response.json();
		tickets = res.data;
		shownTickets = tickets.slice(0, 3);
	});
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
	<h1 class="text">Gescande tickets</h1>
	<p class="count">
		{tickets.filter((ticket) => ticket.scanned).length} van de {tickets.length} tickets gescand
	</p>

	<div class="tickets">
		{#if page > 1}
			<div
				on:click={() => {
					page--;
					shownTickets = [];
					for (let i = page * 3 - 3; i < page * 3; i++) {
						shownTickets.push(tickets[i]);
					}
				}}
				class="ticket"
			>
				Pagina {page - 1}
			</div>
		{/if}

		{#each shownTickets as ticket}
			<div
				class="ticket"
				style="background-color: {ticket.scanned ? 'green' : 'red'}; color: white;"
				on:click={() => {
					if (ticket.scanned) {
						confirmMsg = 'Weet je zeker dat je dit ticket wilt markeren als niet gescand?';
						confirmAction = async () => {
							const res = await fetch(`${env.PUBLIC_API_URL}/scanner/unscan/${ticket.barcode}`);
							const json = await res.json();
							if (json.error) {
								confirmMsg = json.error;
							} else {
								const index = tickets.findIndex((t) => t.barcode === ticket.barcode);
								console.log(index);
								tickets[index].scanned = false;
							}

							//update shownTickets
							shownTickets = [];
							for (let i = page * 3 - 3; i < page * 3; i++) {
								shownTickets.push(tickets[i]);
							}

							shownTickets = [...shownTickets];
							tickets = [...tickets];
						};
					} else {
						confirmMsg = 'Weet je zeker dat je dit ticket wilt markeren als gescand?';
						confirmAction = async () => {
							const res = await fetch(
								`${env.PUBLIC_API_URL}/scanner/scan/${data.date}?barcode=${ticket.barcode}`
							);
							const json = await res.json();
							if (json.error) {
								confirmMsg = json.error;
							} else {
								const index = tickets.findIndex((t) => t.barcode === ticket.barcode);
								console.log(index);

								tickets[index].scanned = true;
							}

							//update shownTickets
							shownTickets = [];
							for (let i = page * 3 - 3; i < page * 3; i++) {
								shownTickets.push(tickets[i]);
							}

							shownTickets = [...shownTickets];
							tickets = [...tickets];
						};
					}
				}}
			>
				{ticket.name}
				| {ticket.scanned ? 'Gescand' : 'Niet gescand'}
			</div>
		{/each}
		{#if tickets.length > 3 * page}
			<div
				on:click={() => {
					page++;
					shownTickets = [];
					for (let i = page * 3 - 3; i < page * 3; i++) {
						shownTickets.push(tickets[i]);
					}
				}}
				class="ticket"
			>
				Pagina {page + 1}
			</div>
		{/if}
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
		top: 18%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 30px;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		text-align: center;
	}

	.tickets {
		position: absolute;
		top: 53%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		text-align: center;
	}

	.ticket {
		background-color: white;
		color: black;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
	}

	.count {
		position: absolute;
		bottom: -3%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-size: 20px;
		font-family: 'Roboto', sans-serif;
		width: 100%;
		text-align: center;
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
</style>
