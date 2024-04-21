import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export function load({cookies}) {
    if (cookies.get('user_token')) {
        return redirect(302,'/app');
    }
}

export const actions = {
    default: async ({cookies, request}) => {
        const formData = await request.formData()

        // depending on the role of the user, create different object
        const dataUser = {
            user: {
                identifier: formData.get('email'),
                password: formData.get('password'),
            },
            civility: '',
            lastname: '',
            firstname: '',
            phone: '',
            postalAddress: {}
        }

        if(formData.get('role') === 'deliveryMan' || formData.get('role') === 'customer') {
            dataUser.postalAddress = {
                postalAddressLine1: formData.get('postalAddressLine1'),
                postalCode: "string",
                city: "string"
            }
        }

        if(formData.get('role') === 'restaurant' || formData.get('role') === 'customer') {
            dataUser.civility = formData.get('civility');
            dataUser.lastname = formData.get('lastname');
            dataUser.firstname = formData.get('firstname');
            dataUser.phone = formData.get('phone');
        }
        

        try {

            const res = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/auth/register',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {

                }
            })
            
        } catch (error) {
            console.log(error);
        }
    }
}