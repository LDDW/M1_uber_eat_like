<script lang="ts">
    import { Card } from "flowbite-svelte";    
</script>

<h1 class="text-3xl font-bold">Mes commandes</h1>

{#each [{},{},{},{},{}] as item, index}
    <Card size="lg" padding="md" class="mt-3"> 
        <div class="flex justify-between">
            <p>commande</p>
        </div>
    </Card>
{/each} 