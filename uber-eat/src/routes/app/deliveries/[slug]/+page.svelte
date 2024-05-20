<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Card, Button } from "flowbite-svelte";
    import { Map, MapStyle, Marker, clearPrewarmedResources, config } from '@maptiler/sdk';
    import "@maptiler/sdk/dist/maptiler-sdk.css";
    export let data;

    config.apiKey = '3hFNWoIIe1JGUrXOopCD';

    let map;
	let mapContainer;

    let customerCoordinates = { lat: 0, lon: 0 };
    let restaurantCoordinates = { lat: data.deliverie.restaurant.postalAddress.latitude, lon: data.deliverie.restaurant.postalAddress.longitude };

    async function getCoordinates() {
        try {
            const res = await fetch('https://api.maptiler.com/geolocation/ip.json?key=3hFNWoIIe1JGUrXOopCD')
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error loading deliveries:', error);
        }
    }

	async function initializeMap() {
        const getCustomerCoordinates = await getCoordinates();
        customerCoordinates.lat = getCustomerCoordinates.latitude;
        customerCoordinates.lon = getCustomerCoordinates.longitude;

		map = new Map({
			container: mapContainer,
			style: MapStyle.STREETS,
			center: [customerCoordinates.lon, customerCoordinates.lat],
			zoom: 7
		});

		new Marker({ color: "#FF0000" })
			.setLngLat([customerCoordinates.lon, customerCoordinates.lat])
			.addTo(map);

		new Marker({ color: "#0000FF" })
			.setLngLat([restaurantCoordinates.lon, restaurantCoordinates.lat])
			.addTo(map);
	}

	onMount(async () => {
		try {
			await initializeMap();
		} catch (error) {
			console.error('Error loading deliveries:', error);
		}
	});

	onDestroy(() => {
		if (map) map.remove();
	});

</script>

<div class="flex justify-between items-center mb-5">
    <h1 class="text-2xl font-bold">Détails de la commande #{data.deliverie.id}</h1>
    <a href="/app/deliveries" class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>          
        <span class="text-sm">Retour</span>
    </a>
</div>

<Card size="lg" padding="md" class="my-5"> 
    <div class="justify-between">
        <!-- carte pour la localisation -->
        <div class="relative w-full h-72 rounded overflow-hidden">
            <div class="map" bind:this={mapContainer}></div>
        </div>

        <!-- infos du restaurant -->
        <h2 class="text-gray-900 font-semibold mt-5 mb-2">Informations du restaurant</h2>
        <p class="text-sm">{data.deliverie.restaurant.name}</p>

        <!-- infos du livreur -->
        <h2 class="text-gray-900 font-semibold mt-5 mb-2">Informations du livreur</h2>
        <p class="text-sm">{data.deliverie.deliveryMan.lastName} {data.deliverie.deliveryMan.firstName}</p>
        <p class="text-sm">{data.deliverie.deliveryMan.phone}</p>
    </div>
</Card>

<!-- forme de ticket avec une card -->
<Card size="lg" padding="md" class="my-5"> 
    <div class="justify-between">
        <h2 class="text-gray-900 font-semibold mb-3">Contenu de la commande</h2>
        <ul>
            {#each data.deliverie.orderItems as orderItem}
                <li class="mb-1 flex justify-between items-center">
                    {#if orderItem.menu !== undefined}
                        <p>{orderItem.menu.name}</p>
                        <p>{orderItem.menu.price} €</p>
                    {:else if orderItem.dish !== undefined}
                        <p>{orderItem.dish.name}</p>
                        <p>{orderItem.dish.price} €</p>
                    {/if}
                </li>
            {/each}
        </ul>
        <hr class="my-5">
        <div class="text-gray-900 font-semibold flex justify-between items-center">
            <p>Total</p>
            <p>
                {data.deliverie.orderItems.reduce((acc, orderItem) => {
                    if (orderItem.menu !== undefined) {
                        return acc + orderItem.menu.price;
                    } else if (orderItem.dish !== undefined) {
                        return acc + orderItem.dish.price;
                    }
                }, 0)} €
            </p>
        </div>
    </div>
</Card>

<style>
    .map-wrap {
        position: relative;
        width: 100%;
        height: 300px;
    }

    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>