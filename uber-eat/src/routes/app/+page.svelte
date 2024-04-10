<script lang="ts">
    import { Card, Button, Toggle, Img, Rating, TableSearch } from 'flowbite-svelte';

    export let data;
</script>


<h1 class="text-3xl font-bold mb-5">Restaurants</h1>
<div class="flex items-center flex-col gap-5">
    {#if data}
        {#each data.restaurants as restaurant, index}
            <Card img="https://picsum.photos/300/100" size="lg" padding="md"> 
                <div class="flex justify-between">
                    <h5 class="text-md font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h5>
                    <Rating id="example-{index}" total={5} size={25} rating={3.98} />
                </div>
            </Card>
        {/each}
    {/if}
</div>