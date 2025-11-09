import { error } from '@sveltejs/kit';
import { API_URL } from '@/lib/config.js';

/**
 * Load function fetches menu for the vendor using the route param.
 * Returns { vendorId, menu } which becomes available as `data` in +page.svelte
 */
export async function load({ params, fetch }) {
  const vendorId = params.vendorId;
  if (!vendorId) {
    throw error(400, 'Missing vendorId in route params');
  }

  const res = await fetch(`${API_URL}/api/menu/vendor/${vendorId}`, { credentials: 'include' });
  if (res.status === 404) {
    return { vendorId, menu: [] };
  }
  if (!res.ok) {
    const txt = await res.text().catch(() => 'Failed to read error body');
    throw error(res.status || 500, txt || 'Failed to fetch vendor menu');
  }

  const result = await res.json();
  console.log('Fetched menu:', result);
  const menu = result.data || [];
  return { vendorId, menu };
}
