<script lang="ts">
  import { API_URL } from '@/lib/config.js';
  import {onMount} from 'svelte'

  let newItem = $state<{name: string; description: string; price: string; image: string}>({
    name: '',
    description: '',
    price: '',
    image: ''
  })
  
  let menuItems = $state<any[]>([])
  let editingItem = $state<any>(null)

  const API_BASE = `${API_URL}/api/menu`
  const API_ENDPOINT = `${API_BASE}/addMenu`
  
  onMount(async () => {
    await fetchMenuItems() 
  })

  async function fetchMenuItems() {
    const token = localStorage.getItem('authToken')
    const respond = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`}
    })
    const data = await respond.json()
    menuItems = data.data || []
  }
  
  async function handleAddItem(e: Event) {
    e.preventDefault();
    
    if (!newItem.name || !newItem.price || !newItem.description) {
      alert('Please fill out required fields.');
      return;
    }

    const token = localStorage.getItem('authToken');

    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newItem)
    });

    if (res.ok) {
      await fetchMenuItems();
      newItem = { name: '', description: '', price: '', image: '' };
    } else {
      alert('Error creating item');
    }
  }

  async function handleDeleteItem(id: string) {
    if (!confirm('Delete this item?')) return;

    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_BASE}/${id}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      menuItems = menuItems.filter((i: any) => i._id !== id);
    }
  }
  
  function startEdit(item: any) {
    editingItem = { ...item };
  }

  async function handleUpdateItem() {
    if (!editingItem) return;
    
    const token = localStorage.getItem('authToken');

    const res = await fetch(`${API_BASE}/${editingItem._id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price,
        image: editingItem.image
      })
    });

    if (res.ok) {
      editingItem = null;
      await fetchMenuItems();
    } else alert('Error updating item');
  }
</script>

<main class="max-w-6xl mx-auto p-4 md:p-8">
  <div class="mb-8">
    <h1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Menu Management</h1>
    <p class="text-base text-slate-600">Add new items or manage existing ones.</p>
  </div>

  <form class="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm mb-12" method="POST" action="/api/menu/addMenu" onsubmit={handleAddItem}>
    <h2 class="text-xl font-semibold mb-6">Add New Item</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col">
        <label for="item-name" class="text-sm font-medium text-slate-700 mb-2">Item Name</label>
        <input
          type="text"
          id="item-name"
          placeholder="e.g., Spicy Chicken Sandwich"
          bind:value={newItem.name}
          class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div class="flex flex-col">
        <label for="description" class="text-sm font-medium text-slate-700 mb-2">Description</label>
        <textarea
          id="description"
          placeholder="Describe the item"
          bind:value={newItem.description}
          class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <label for="price" class="text-sm font-medium text-slate-700 mb-2">Price</label>
        <input
          type="number"
          step="0.01"
          id="price"
          placeholder="e.g., 9.99"
          bind:value={newItem.price}
          class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <div class="flex flex-col">
        <label for="image" class="text-sm font-medium text-slate-700 mb-2">Image</label>
        <input 
          type="url" 
          id="image" 
          placeholder="Image URL" 
          bind:value={newItem.image}
          class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <button type="submit" class="bg-indigo-600 text-white px-6 py-3 border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-indigo-700">
        Add Item
      </button>
    </div>
  </form>
  
  {#if editingItem}
  <div class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8">
      <h2 class="text-xl font-semibold mb-6">Edit Menu Item</h2>
      <div class="grid grid-cols-1 gap-6">
        <div class="flex flex-col">
          <label for="edit-name" class="text-sm font-medium text-slate-700 mb-2">Item Name</label>
          <input 
            type="text" 
            id="edit-name" 
            bind:value={editingItem.name}
            class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="edit-description" class="text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea 
            id="edit-description" 
            bind:value={editingItem.description}
            class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label for="edit-price" class="text-sm font-medium text-slate-700 mb-2">Price</label>
          <input 
            type="number" 
            step="0.01" 
            id="edit-price" 
            bind:value={editingItem.price}
            class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="edit-image" class="text-sm font-medium text-slate-700 mb-2">Image URL</label>
          <input 
            type="url" 
            id="edit-image" 
            bind:value={editingItem.image}
            class="w-full px-4 py-3 text-sm border border-slate-200 rounded-md font-[inherit] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div class="flex gap-3 mt-6 flex-col md:flex-row">
        <button 
          class="bg-indigo-600 text-white px-6 py-3 border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-indigo-700" 
          onclick={handleUpdateItem}
        >
          Save Changes
        </button>
        <button 
          class="bg-slate-600 text-white px-6 py-3 border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-slate-700" 
          onclick={() => editingItem = null}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  {/if}
  
  <div class="mt-12">
    <h2 class="text-xl font-semibold mb-6">Current Menu Items</h2>
    <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th class="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-600 font-semibold border-b border-slate-200">Image</th>
              <th class="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-600 font-semibold border-b border-slate-200">Description</th>
              <th class="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-600 font-semibold border-b border-slate-200">Item Name</th>
              <th class="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-600 font-semibold border-b border-slate-200">Price</th>
              <th class="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-600 font-semibold border-b border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each menuItems as item (item._id)}
              <tr>
                <td class="px-6 py-5 text-sm text-slate-700 border-b border-slate-200">
                  <img src={item.image} alt={item.name} class="max-w-[60px] h-auto rounded" />
                </td>
                <td class="px-6 py-5 text-sm text-slate-700 border-b border-slate-200">{item.description}</td>
                <td class="px-6 py-5 text-sm font-medium text-slate-900 border-b border-slate-200">{item.name}</td>
                <td class="px-6 py-5 text-sm text-slate-700 border-b border-slate-200">${item.price.toFixed(2)}</td>
                <td class="px-6 py-5 text-sm text-slate-700 border-b border-slate-200">
                  <div class="flex gap-2 flex-col md:flex-row">
                    <button 
                      class="bg-green-500 text-white px-4 py-2 border-none rounded cursor-pointer text-sm hover:bg-green-600" 
                      onclick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      class="bg-red-500 text-white px-4 py-2 border-none rounded cursor-pointer text-sm hover:bg-red-600" 
                      onclick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
