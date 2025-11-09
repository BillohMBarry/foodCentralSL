import { API_URL } from '@/lib/config.js';

/**
 * @type {import('./$types').PageLoad}
 */
export async function load({ fetch }) {
  try {
    const res = await fetch(`${API_URL}/api/vendors`);

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Failed to read error body');
      console.error(`Failed to fetch vendors: ${res.status} ${errorText}`);
      return { vendors: [] };
    }

    const data = await res.json();
    // The backend returns { success: true, data: vendors }
    return { vendors: data.data };
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return { vendors: [] };
  }
}
