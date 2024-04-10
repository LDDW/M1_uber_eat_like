import { error, redirect } from '@sveltejs/kit';
import axios from 'axios';

export async function load({ cookies }) {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://ubereatlike-api.logan-eono.fr/api/restaurants`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.get('user_token')}`
            }
        });

        const restaurants = response.data['hydra:member'];
        
        return {restaurants};

    } catch (err) {
        redirect(302, '/auth/login');
    }
}