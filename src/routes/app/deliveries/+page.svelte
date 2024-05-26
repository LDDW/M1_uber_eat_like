<script lang="ts">
    import { Card, Button } from "flowbite-svelte";    
    import { cart } from './../../../lib/stores/cart';

    export let data;
</script>

<h1 class="text-3xl font-bold mb-3">Ma commande en cours</h1>
{#if $cart.length > 0}
    {#each $cart as restaurant}
        <a href={"restaurant/"+ restaurant.restaurant.id}>
            <Card size="lg" padding="md" class="my-5"> 
                <div class="justify-between">
                    <div class="flex justify-between">
                        <p class="font-bold text-gray-900">{restaurant.restaurant.name}</p>
                        <p>Total : {$cart.filter(item => item.restaurant.id === restaurant.restaurant.id).reduce((acc, item) => acc + item.products.reduce((acc, product) => acc + product.price, 0), 0).toFixed(2)}€</p>
                    </div>
                    <Button color="primary" size="sm" class="mt-5">Voir le contenu du panier</Button>
                </div>
            </Card>
        </a>
        
    {/each}
{:else}
    <p>Aucune commande</p>
{/if}

<h1 class="text-3xl font-bold mb-3 mt-10">Mes commandes passées</h1>
{#if data.deliveries.length > 0}
    <div>
        {#each data.deliveries as deliverie}
            <a href={`deliveries/${deliverie.id}`}>

                <Card size="lg" padding="md" class="my-5">
                    <p>#{deliverie.id} - {deliverie.restaurant.name}</p>
                    <p>{deliverie.orderItems.reduce((acc, orderItem) => {
                        if (orderItem.menu !== undefined) {
                            return acc + orderItem.menu.price;
                        } else if (orderItem.dish !== undefined) {
                            return acc + orderItem.dish.price;
                        }
                    }, 0)} €</p>
                    <p>{deliverie.status}</p>
                    <Button color="primary" size="sm" class="mt-5 w-full">Voir le détail de la commande</Button>
                </Card>
            </a>
        {/each}
    </div>
{:else}
    <p>Aucune commande</p>
{/if}