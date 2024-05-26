<script lang="ts">
    import { Card, Input, Label, Helper, Button, Select } from "flowbite-svelte";

	export let data;	
	export let form;

	let gender = [
        { value: 'Mr', name: 'Homme' },
        { value: 'Mrs', name: 'Femme' },
    ];
</script>

<h1 class="text-3xl font-bold mb-5">Mon compte</h1>

<h2 class="mb-2 text-sm">Informations personnelles</h2>
<Card size="lg" padding="md">
    <form method="POST" action="?/update">
		<input type="hidden" name="id" value={data.user.id ?? ''}>
		<input type="hidden" name="id_address" value={data.user.postalAddress.id ?? ''}>

		<div class="flex gap-3 mb-3">
			<div class="w-full">
				<Label for="lastname" class="mb-1">Nom</Label>
				<Input type="text" id="lastname" name="lastname" value={data.user.lastName ?? ''} autocomplete="lastname" placeholder="Votre nom" />
			</div>
	
			<div class="w-full">
				<Label for="firstname" class="mb-1">Prénom</Label>
				<Input type="text" id="firstname" name="firstname" value={data.user.firstName ?? ''} autocomplete="firstname" placeholder="Votre prénom" />
			</div>
		</div>

		<Label class="mb-3">
			Genre
			<Select type="button" name="civility" class="mt-2" items={gender} value={data.user.civility}  />
		</Label>

        <div class="mb-3">
			<Label for="email" class="mb-1">Email</Label>
			<Input type="email" id="email" name="email" value={data.user.user.identifier ?? ''} autocomplete="email" placeholder="Votre email" />
		</div>

		<div class="mb-3">
			<Label for="phone" class="mb-1">Téléphone</Label>
			<Input type="text" id="phone" name="phone" value={data.user.phone ?? ''} autocomplete="phone" placeholder="Votre Téléphone" />
		</div>

		<div class="mb-3">
			<Label for="address" class="mb-1">Adresse</Label>
			<Input type="text" id="address" name="address" value={data.user.postalAddress.postalAddressLine1 ?? ''} autocomplete="address" placeholder="Votre Adresse" />
		</div>
	
		<div>
			<Label for="password" class="mb-1">Mot de passe</Label>
			<Input type="password" id="password" name="password" autocomplete="password" value={''} placeholder="Votre mot de passe" />
		</div>
		
		<div class="flex items-center justify-between mt-5">
			<Button type="submit">Enregistrer</Button>
		</div>
    </form>
</Card>

<form method="POST" action="?/logout">
	<Button type="submit" class="w-full mt-5">
		Déconnexion
	</Button>
</form>