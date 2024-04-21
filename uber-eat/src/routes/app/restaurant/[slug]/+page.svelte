<script lang="ts">
    import { Card, Button, Toggle, Img, Rating, TableSearch } from 'flowbite-svelte';

    export let data;
</script>


<h1 class="text-3xl font-bold mb-5">{data.restaurant.name}</h1>
<div class="flex items-center flex-col gap-5">
    <img src="https://picsum.photos/300/100" alt="" class="w-full">

    <h2>Menus </h2>
    <div>
    
    </div>
    <h2>Plats </h2>
</div>