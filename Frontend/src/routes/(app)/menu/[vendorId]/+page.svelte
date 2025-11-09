<script>
  import MenuCard from '@/lib/components/ui/menuCard.svelte';
  import menuImage from '@/lib/assets/profileImg.jpg';

  /**
   * @typedef {object} PageData
   * @property {string} vendorId - The unique identifier for the vendor.
   * @property {Array.<{image: string, cursineName: string, name: string, description: string, price: number}>} menu - The list of menu items for the vendor.
   */

   /** @type {PageData} */
  export let data;
 
  // data is supplied by +page.js load() below. It contains { vendorId, menu }
  const vendorId = data?.vendorId;
  const menuItems = data?.menu ?? [];

  const placeholder = {
    menuImage: menuImage,
    cursineName: 'Jollof rice',
    description: 'sierra leone jollof rice, with different variety',
    price: 10,
    link: '/addCart'
  };
</script>

<!-- If the load function returned menu items, render them; otherwise show a placeholder -->
{#if menuItems.length > 0}
  {#each menuItems as item}
    <MenuCard
      menuImage={item.image ?? menuImage}
      cursineName={item.name}
      description={item.description}
      price={item.price}
    />
  {/each}
{:else}
  <p>No menu items found for this vendor.</p>
{/if}
<!--when i signin and add vendor and menu profile the profileCard will load without and error, but if don't add no vendor profile and menu it return an 401 Failed to fetch vendors: 401 {"success":false,"message":"Unauthorized"}. why this unexpected behaviour  -->