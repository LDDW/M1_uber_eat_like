import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export function load({cookies}) {
    if (cookies.get('user_token')) {
        return redirect(302,'/app');
    }
}  

export const actions = {
    default: async ({cookies, request}) => {
        const formData = await request.formData()
        const email = formData.get('email')
        const password = formData.get('current_password')

        try {
            const response = await axios({
                method: 'POST',
                url: `https://ubereatlike-api.logan-eono.fr/api/authentication_token`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    identifier: email,
                    password: password
                }
            });

            const token = response.data.token;
            const decoded = jwt.decode(token, {complete: true});

            const now = Math.floor(Date.now() / 1000);
            const expiresAt = decoded.header.exp;
            const remainingDuration = expiresAt - now;

            cookies.set('user_token', token, {
                path: '/',
                expires: remainingDuration
            });

        } catch (err) {
            console.log(err);
        }
    }
}