<script lang="ts">
  import { cartStore } from '$lib/stores/cartStore.svelte.js';
  import { Trash2 } from 'lucide-svelte';

  function updateQuantity(cursineName: string, newQuantity: string) {
    cartStore.updateQuantity(cursineName, parseInt(newQuantity));
  }

  function removeItem(cursineName: string) {
    cartStore.removeItem(cursineName);
  }
</script>

<div class="max-w-6xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>

  {#if cartStore.items.length === 0}
    <div class="text-center py-12">
      <p class="text-xl text-gray-600">Your cart is empty</p>
      <a href="/menu" class="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Browse Menu
      </a>
    </div>
  {:else}
    <div class="space-y-4">
      {#each cartStore.items as item}
        <div class="flex gap-4 p-4 bg-white rounded-lg shadow-md">
          <img src={item.menuImage} alt={item.cursineName} class="w-24 h-24 object-cover rounded" />
          <div class="flex-1">
            <h3 class="text-xl font-semibold">{item.cursineName}</h3>
            <p class="text-gray-600 text-sm">{item.description}</p>
            <p class="text-lg font-bold mt-2">Le {item.price}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label for="qty-{item.cursineName}" class="text-sm">Qty:</label>
              <input 
                id="qty-{item.cursineName}"
                type="number" 
                min="1" 
                value={item.quantity} 
                onchange={(e) => updateQuantity(item.cursineName, (e.target as HTMLInputElement).value)}
                class="w-16 px-2 py-1 border rounded text-center"
              />
            </div>
            <p class="font-bold w-24 text-right">Le {item.price * item.quantity}</p>
            <button 
              onclick={() => removeItem(item.cursineName)}
              class="p-2 text-red-600 hover:bg-red-50 rounded"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      {/each}

      <div class="mt-6 p-4 bg-gray-100 rounded-lg">
        <div class="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span>Le {cartStore.total}</span>
        </div>
        <button class="mt-4 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  {/if}
</div>