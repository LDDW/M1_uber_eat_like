<script>
    import { Input, Label, Helper, Button, Select } from 'flowbite-svelte';

    // role
    let role_selected;
    let roles = [
        { value: 'customer', name: 'Client' },
        { value: 'restaurant', name: 'Restaurant' },
        { value: 'deliveryMan', name: 'Livreur' }
    ];

    // gender
    let gender_selected;
    let gender = [
        { value: 'mr', name: 'Homme' },
        { value: 'mme', name: 'Femme' },
        { value: 'autre', name: 'Autre' }
    ];
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register" />
</svelte:head>

<section class="h-[calc(100vh-80px)] w-full flex items-center justify-center">
    <form class="max-w-md w-full bg-white rounded-lg p-5 shadow-xl">
        <h1 class="text-2xl font-semibold mb-5">Inscription</h1>

        <Label class="mb-3">
            Vous êtes
            <Select class="mt-2" items={roles} bind:value={role_selected} />
        </Label>

        {#if role_selected !== ''}
		<Label class="mb-3">
            Sélectionnez votre genre
            <Select class="mt-2" items={gender} bind:value={gender_selected} />
        </Label>

        <div class="flex gap-3 w-full mb-3">
            <div class="w-full">
                <Label for="name">Nom</Label>
                <Input type="text" id="name" name="name" placeholder="Votre nom" />
            </div>
    
            <div class="w-full">
                <Label for="firstname">Prénom</Label>
                <Input type="text" id="firstname" name="firstname" placeholder="Votre prénom" />
            </div>
        </div>
        
        <div class="mb-3">
            <Label for="email" class="mb-1">Email</Label>
            <Input type="email" id="email" name="email" placeholder="Votre email" />
        </div>

        <div>
            <Label for="password" class="mb-1">Mot de passe</Label>
            <Input type="password" id="password" name="password" placeholder="Votre mot de passe" />
        </div>
		{/if}
        
        <div class="flex items-center justify-between mt-5">
            <Button type="submit">Inscription</Button>
            <a href="/auth/login" class="block text-center mt-3 text-sm text-gray-500 hover:text-gray-700">Déjà inscrit ? Connectez-vous</a>
        </div>
    </form>
</section>