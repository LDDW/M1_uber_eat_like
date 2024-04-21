import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export function load({cookies}) {
    try {
        // load data about user
    } catch (error) {
        cookies.delete('user_token', { path: '/' });
        redirect(302, '/auth/login')
    }
}

export const actions = {

}