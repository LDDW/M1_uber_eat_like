import { redirect } from '@sveltejs/kit';

export function load({cookies}) {
    if (cookies.get('user_token')) {
        return redirect(302,'/app');
    } else {
        return redirect(302,'/auth/login');
    }
}