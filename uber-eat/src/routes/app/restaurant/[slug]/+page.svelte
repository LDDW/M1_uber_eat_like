<script lang="ts">
    import { cart } from './../../../../lib/stores/cart';
    import { Card, Button, Toggle, Img, Rating, TableSearch } from 'flowbite-svelte';

    const addToCart = (product) => {
        cart.update((items) => {
            return [...items, product]
        })
	}

    export let data;
</script>


<div class="flex justify-between items-center mb-5">
    <h1 class="text-3xl font-bold">{data.restaurant.name}</h1>
    <a href="/app" class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>          
        <span class="text-sm">Retour</span>
    </a>
</div>
<div class="flex flex-col gap-5">
    <img src="https://picsum.photos/300/100" alt="" class="w-full">

    <h2 class="text-xl font-bold">Menus</h2>
    <div>
        {#if data.menus.length > 0}
            {#each data.menus as menu}
                <div class="flex justify-between w-full mb-1">
                    <p>{menu.name}</p>
                    <div class="flex gap-5">
                        <p>{menu.price} €</p>
                        <div class="flex items-center gap-1.5">
                            <button class="p-1 border border-gray-200 rounded-full hover:bg-gray-100" on:click={() => addToCart(menu)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>            
            {/each}
        {:else}
            <p>Aucun menu disponible</p>    
        {/if}
    </div>
    <h2 class="text-xl font-bold">Plats</h2>
    <div> 
        {#if data.dishes.length > 0}
            {#each data.dishes as dish}
            <div class="flex justify-between w-full mb-1">
                <p>{dish.name}</p>
                
                <div class="flex gap-5">
                    <p>{dish.price} €</p>
                    <div class="flex items-center gap-1.5">
                        <button class="p-1 border border-gray-200 rounded-full hover:bg-gray-100" on:click={() => addToCart(dish)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>                   
            {/each}
        {:else}
            <p>Aucun plat disponible</p>    
        {/if}
    </div>
</div>