<script lang="ts">
    import { Card } from "flowbite-svelte";    
</script>

<h1 class="text-3xl font-bold">Mes commandes</h1>

<h2 class="text-lg font-bold">Commande en cours</h2>  


<h2 class="text-lg font-bold">Historique de mes commandes</h2>  
{#each [{},{},{},{},{}] as item, index}
    <Card size="lg" padding="md" class="mt-3"> 
        <div class="flex justify-between">
            <p>commande</p>
        </div>
    </Card>
{/each} 