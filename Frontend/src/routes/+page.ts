import { redirect } from '@sveltejs/kit';

export const load = () => {
  // Redirect root path to the home page route
  throw redirect(307, '/home');
};
