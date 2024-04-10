<script lang="ts">
    import { Input, Label, Helper, Button } from 'flowbite-svelte';
	
    const user = {
        identifier: 'customer10@ubereatlike.logan-eono.fr',
        password: 'apassword'
    }
	
	export let data;
	export let form;

</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<section class="h-[calc(100vh-80px)] w-full flex items-center justify-center">
	<form method="POST" class="max-w-md w-full bg-white rounded-lg p-5 shadow-xl">
		{#if form?.missing}<p class="error">The email field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
		<h1 class="text-2xl font-semibold mb-5">Connexion</h1>
		
		<div class="mb-3">
			<Label for="email" class="mb-1">Email</Label>
			<Input type="email" id="email" name="email" placeholder="Votre email" value={user?.identifier ?? ''} autocomplete="username" />
		</div>
	
		<div>
			<Label for="password" class="mb-1">Mot de passe</Label>
			<Input type="password" id="current_password" name="current_password" placeholder="Votre mot de passe" value={user?.password ?? ''} autocomplete="current-password" />
		</div>
		
		<div class="flex items-center justify-between mt-5">
			<Button type="submit">Connexion</Button>
			<a href="/auth/register" class="block text-center text-sm text-gray-500 hover:text-gray-700">Pas encore inscrit ? Inscrivez-vous</a>
		</div>
	</form>
</section>
