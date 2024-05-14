import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { cart } from '../../../lib/stores/cart';

export async function load({cookies}) {
    try {
        const deliveries = await axios({
            method: 'GET',
            url: `https://ubereatlike-api.logan-eono.fr/api/deliveries`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.get('user_token')}`
            }
        })

        return {
            deliveries: deliveries.data['hydra:member']
        }

    } catch (error) {
        cookies.delete('user_token', { path: '/' });
        redirect(302, '/auth/login')
    }
}