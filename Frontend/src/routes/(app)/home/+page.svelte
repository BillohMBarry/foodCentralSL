<script lang='js'>
  import { onMount } from 'svelte';
  import { API_URL } from '@/lib/config.js';
  import HeroSection from '@/lib/components/ui/heroSection.svelte'
  import image2 from '@/lib/assets/profileImg.jpg'
  import ProfileCard from '@/lib/components/ui/profileCard.svelte'
  import SearchBar from '@/lib/components/ui/searchBar.svelte'
  /**
   * @typedef {object} vendors
   * @property {string} _id - The unique identifier for the vendor.
   * @property {string} restaurantName - The name of the restaurant.
   * @property {string} profileImage - URL to the vendor's profile image.
   * @property {string} description - A brief description of the vendor.
   */
  /** @type {vendors[]} */
  let vendors = [];
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch(`${API_URL}/api/vendors`);
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Failed to read error body');
        console.error(`Failed to fetch vendors: ${res.status} ${errorText}`);
        return;
      }

      const data = await res.json();
      vendors = data.data;
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      loading = false;
    }
  });

</script>

<HeroSection />
<h3 class="text-2xl text-center font-semibold px-5 py-4">Menu's</h3>
<SearchBar />
<div class="flex p-5  flex-row justify-center gap-2.5 flex-wrap">
  {#if loading}
    <p>Loading...</p>
  {:else if vendors && vendors.length > 0}
    {#each vendors as vendor}
      <ProfileCard 
        profileImage={vendor.profileImage || image2} 
        restaurantName={vendor.restaurantName} 
        link={`/menu/${vendor._id}`} 
      />
    {/each}
  {:else}
    <p>No vendors available at the moment.</p>
  {/if}
</div>
