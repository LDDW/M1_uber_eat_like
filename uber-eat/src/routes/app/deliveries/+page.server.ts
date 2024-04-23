import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export async function load({cookies}) {
    try {

        // const token = cookies.get('user_token');
        // const decoded = jwt.decode(token, {complete: true});

        // console.log(decoded)

        const deliveries = await axios({
            method: 'GET',
            url: `https://ubereatlike-api.logan-eono.fr/api/deliveries`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.get('user_token')}`
            }
        })

        console.log(deliveries.data['hydra:member'])

        return {
            deliveries: deliveries.data['hydra:member']
        }

    } catch (error) {
        cookies.delete('user_token', { path: '/' });
        redirect(302, '/auth/login')
    }
}

export const actions = {

}