<script lang="ts">
    import { Card, Input, Label, Helper, Button } from "flowbite-svelte";
</script>

<h1 class="text-3xl font-bold mb-5">Mon compte</h1>

<h2 class="mb-2 text-sm">Informations personnelles</h2>
<Card size="lg" padding="md">
    <form action="POST">
        <div class="mb-3">
			<Label for="email" class="mb-1">Email</Label>
			<Input type="email" id="email" name="email" placeholder="Votre email" autocomplete="username" />
		</div>
	
		<div>
			<Label for="password" class="mb-1">Mot de passe</Label>
			<Input type="password" id="current_password" name="current_password" placeholder="Votre mot de passe"  autocomplete="current-password" />
		</div>
		
		<div class="flex items-center justify-between mt-5">
			<Button type="submit">Enregistrer</Button>
		</div>
    </form>
</Card>


<h2 class="mb-2 mt-5 text-sm">Supprimer le compte</h2>
<Card size="lg" padding="md">
    <form action="">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis molestias deserunt voluptas totam et distinctio, dicta tempore aliquid hic sint velit, eveniet rerum odio tenetur aut pariatur eligendi doloribus odit.</p>
        <div class="flex items-center justify-between mt-5">
			<Button type="submit">Supprimer mon compte</Button>
		</div>
    </form>
</Card>