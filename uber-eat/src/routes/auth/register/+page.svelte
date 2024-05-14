<script>
    import { Input, Label, Helper, Button, Select } from 'flowbite-svelte';

    // let role_selected;
    // let roles = [
    //     { value: 'customer', name: 'Client' },
    //     { value: 'restaurant', name: 'Restaurant' },
    //     { value: 'deliveryMan', name: 'Livreur' }
    // ];

    let gender_selected;
    let gender = [
        { value: 'Mr', name: 'Homme' },
        { value: 'Mrs', name: 'Femme' },
    ];
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register" />
</svelte:head>

<section class="h-[calc(100vh-80px)] w-full flex items-center justify-center">
    <form class="max-w-md w-full bg-white rounded-lg p-5 shadow-xl" method="POST">
        <h1 class="text-2xl font-semibold mb-5">Inscription</h1>

        <!-- <Label class="mb-3">
            Vous êtes
            <Select class="mt-2" items={roles} bind:value={role_selected} />
        </Label> -->

        <!-- {#if role_selected !== ''} -->
	
            <!-- {#if role_selected === 'customer' || role_selected === 'deliveryMan'} -->
                <Label class="mb-3">
                    Sélectionnez votre genre
                    <Select class="mt-2" id="civility" name="civility" items={gender} bind:value={gender_selected} />
                </Label>

                <div class="flex gap-3 w-full mb-3">
                    <div class="w-full">
                        <Label for="name" class="mb-1">Nom</Label>
                        <Input type="text" id="lastname" name="lastname" placeholder="Votre nom" required />
                    </div>
            
                    <div class="w-full">
                        <Label for="firstname" class="mb-1">Prénom</Label>
                        <Input type="text" id="firstname" name="firstname" placeholder="Votre prénom" required />
                    </div>
                </div>

                <div class="mb-3">
                    <Label for="phone" class="mb-1">Téléphone</Label>
                    <Input type="tel" id="phone" name="phone" placeholder="Votre téléphone" required />
                </div>
            <!-- {/if} -->
            
            <div class="mb-3">
                <Label for="email" class="mb-1">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Votre email" required />
            </div>

            <div class="mb-3">
                <Label for="password" class="mb-1">Mot de passe</Label>
                <Input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
            </div>

            <!-- {#if role_selected === 'customer' || role_selected === 'restaurant'} -->
                <div class="w-full mb-3">
                    <Label for="postalAddressLine" class="mb-1">Adresse</Label>
                    <Input type="text" id="postalAddressLine" name="postalAddressLine" placeholder="Votre adresse" required />
                </div>

                <div class="flex gap-3 w-full mb-3">
                    <div class="w-full">
                        <Label for="postalCode" class="mb-1">Code postal</Label>
                        <Input type="text" id="postalCode" name="postalCode" placeholder="Votre code postal" required />
                    </div>
            
                    <div class="w-full">
                        <Label for="city" class="mb-1">Ville</Label>
                        <Input type="text" id="city" name="city" placeholder="Votre ville" required />
                    </div>
                </div>
            <!-- {/if} -->
		<!-- {/if} -->
        
        <div class="flex items-center justify-between mt-5">
            <Button type="submit">Inscription</Button>
            <a href="/auth/login" class="block text-center text-sm text-gray-500 hover:text-gray-700">Déjà inscrit ? Connectez-vous</a>
        </div>
    </form>
</section>