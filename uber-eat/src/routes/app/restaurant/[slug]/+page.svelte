<script lang="ts">
    import { cart } from './../../../../lib/stores/cart';
    import { Button } from 'flowbite-svelte';

    const addToCart = (product, restaurant) => {
        cart.update((items) => {
            if(items.find(item => item.restaurant.id === restaurant.id)) {
                items.map(item => {
                    if(item.restaurant.id === restaurant.id) {
                        item.products = [...item.products, product];
                    }
                })
            } else {
                items = [...items, {restaurant, products: [product]}];
            }
            console.log(items)
            return items;
        })
	}

    const removeToCart = (product, restaurant) => {
        cart.update((items) => {
            if(items.find(item => item.restaurant.id === restaurant.id)) {
                items.map(item => {
                    if(item.restaurant.id === restaurant.id) {
                        item.products.splice(item.products.findIndex(p => p === product), 1);
                        if(item.products.length === 0) {
                            items.splice(items.findIndex(i => i === item), 1);
                        }
                    }
                })
            }
            console.log(items)
            return items;
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
                            <button class="p-1 border border-gray-200 rounded-full hover:bg-gray-100" on:click={() => addToCart(menu, data.restaurant)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                            <p class="text-sm w-3 text-center">{$cart.find(item => item.restaurant.id === data.restaurant.id)?.products.filter(p => p.id === menu.id).length || 0}</p>
                            <button class="p-1 border border-gray-200 rounded-full hover:bg-gray-100" on:click={() => removeToCart(menu, data.restaurant)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
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
    <div class="pb-20"> 
        {#if data.dishes.length > 0}
            {#each data.dishes as dish}
                <div class="flex justify-between w-full mb-1">
                    <p>{dish.name}</p>
                    <div class="flex gap-5">
                        <p>{dish.price} €</p>
                        <div class="flex items-center gap-1.5">
                            <button class="p-1 border border-gray-200 rounded-full hover:bg-gray-100" on:click={() => addToCart(dish, data.restaurant)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                            <p class="text-sm w-3 text-center">{$cart.find(item => item.restaurant.id === data.restaurant.id)?.products.filter(p => p.id === dish.id).length || 0}</p>
                            <button class="p-1 border border-gray-200 rounded-full hover:bg-gray-100" on:click={() => removeToCart(dish, data.restaurant)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
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

    <div class="fixed bottom-16 left-0 w-full h-16 flex items-center justify-between px-5 border-t bg-white z-50">
        <p>Total : {$cart.filter(item => item.restaurant.id === data.restaurant.id).reduce((acc, item) => acc + item.products.reduce((acc, product) => acc + product.price, 0), 0).toFixed(2)}€</p>
        <form method="POST">
            <input type="hidden" name="cartData" value={JSON.stringify($cart.filter(item => item.restaurant.id === data.restaurant.id))} />
            <Button disabled={$cart.find(item => item.restaurant.id === data.restaurant.id)?.products !== undefined ? false : true} type="submit">Payer</Button>
        </form>
    </div>

</div>