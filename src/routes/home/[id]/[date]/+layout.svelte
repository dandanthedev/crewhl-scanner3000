<script>
	export let data;
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { date, production } from '$lib/stores';

	const getDate = async () => {
		const response = await fetch(
			`${env.PUBLIC_API_URL}/scanner/productions/${data.id}/${data.date}`
		);
		const res = await response.json();
		$date = res.data;
	};

	getDate();
</script>

<div class="bg">
	<h1 class="productionDate">{$date?.description || ''}</h1>
	<slot />
</div>

<style>
	.bg {
		background-color: #11b4e2;
		width: 100%;
		height: 100%;
	}

	.productionDate {
		/*top right*/
		position: absolute;
		top: 11%;
		right: 5%;
		color: white;
		font-size: 18px;
		font-family: 'Roboto', sans-serif;
		text-align: center;
	}
</style>
