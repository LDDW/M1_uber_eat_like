<script lang="ts">
    import { Card } from "flowbite-svelte";    
    import { cart } from './../../../lib/stores/cart';

    export let data;
</script>

<h1 class="text-3xl font-bold mb-3">Mes commandes</h1>
<Card size="lg" padding="md" class="my-5"> 
    <div class="justify-between">
        <p>Commande en cours</p>
        {#each $cart as product}
            <div class="flex">
                <p>{product.name}</p>
                <p>{product.price} €</p>
            </div>
        {/each}
        <hr>
        <div class="flex justify-between">
            <p>Total</p>
            <p>{$cart.reduce((acc, product) => acc + product.price, 0)} €</p>
        </div>
        <button>Payer</button>
    </div>
</Card>

{#if data.deliveries.length > 0}
    {#each data.deliveries as delivery}
        <Card size="lg" padding="md" class="mt-3"> 
            <div class="flex justify-between">
                <p>commande</p>
            </div>
        </Card>
    {/each}
{:else}
    <p>Aucune commande</p>
{/if}