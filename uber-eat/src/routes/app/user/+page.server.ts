import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export async function load({cookies}) {
    try {
        // load data about user
        const token = cookies.get('user_token');
        const decoded = jwt.decode(token, {complete: true});

        const res = await axios(
            {
                method: 'GET',
                url: `https://ubereatlike-api.logan-eono.fr/api/customers?user.identifier=${decoded.payload.username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return {user: res.data['hydra:member'][0]};

    } catch (err) {
        if(err.response.status === 401) {
            cookies.delete('user_token', { path: '/' });
            redirect(302, '/auth/login')
        }
    }
}

export const actions = {
    update: async ({cookies, request}) => {
        try {
            const formData = await request.formData();
            if(formData.get('id') !== undefined) {
                const id = formData.get('id');
                const token = cookies.get('user_token');
                const res = await axios(
                    {
                        method: 'PUT',
                        url: `https://ubereatlike-api.logan-eono.fr/api/customers/${id}`,
                        headers: {
                            'Content-Type': 'application/ld+json',
                            'Authorization': `Bearer ${token}`
                        },
                        data: {
                            "user": {
                                "@id": `/api/users/${id}`,
                                "identifier": formData.get('email'),
                                "plainPassword": formData.get('password') ?? null, 
                            },
                            "civility": formData.get('civility'),
                            "firstName": formData.get('firstname'),
                            "lastName": formData.get('lastname'),
                            "phone": formData.get('phone'),
                            "postalAddress": {
                                "@id": `/api/postal_addresses/${formData.get('id_address')}`,
                                "postalAddressLine1": formData.get('address'),
                                "postalCode": "string",
                                "city": "string"
                            }
                        }
                    }
                );   
            }
        } catch (err) {
            if(err.response.status === 401) {
                cookies.delete('user_token', { path: '/' });
                redirect(302, '/auth/login')
            }
        }
    },
    logout: async ({cookies}) => {
        cookies.delete('user_token', { path: '/' });
        throw redirect(302, '/')
    }
}