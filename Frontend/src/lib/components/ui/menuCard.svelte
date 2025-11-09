<script>
  import { cartStore } from '$lib/stores/cartStore.svelte.js';
  // let {menuImage, cursineName, description, price} = $props();

  /**
   * @type {string} menuImage - URL to the menu item's image
   */
  export let menuImage;
  /**
   * @type {string} cursineName - The name of the cuisine
   */
  export let cursineName;
  /**
   * @type {string} description - A brief description of the menu item
   */
  export let description;
  /**
   * @type {number} price - The price of the menu item
   */
  export let price;

  function handleAddToCart() {
    cartStore.addItem({ menuImage, cursineName, description, price });
  }
</script>

<section class="flex flex-wrap gap-5 max-w-[1200px] mx-auto pt-8">
  <img src={menuImage} alt={cursineName} class="rounded-xl w-[200px] h-[30vh] object-cover" loading="lazy">
  <div class="flex-1 min-w-[250px]">
    <div class="mb-2">
      <h1 class="text-xl font-bold mb-1.5">{cursineName}</h1>
      <p class="text-gray-700">{description}</p>
    </div>
    <div class="mt-1.5 flex items-center gap-10">
      <span class="font-medium">Price: le {price}</span>
      <button onclick={handleAddToCart} class="px-4 py-1.5 rounded bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-colors">Add Cart</button>
      <!-- <a href={link} aria-current={page.url.pathname === link} >
        Add Cart
      </a> -->
    </div>
  </div>
</section>
