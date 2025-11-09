<!-- <script lang="ts">
  import { Search, Bell, Moon, ChevronDown } from 'lucide-svelte';

  const vendorProfile = (async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("Authentication token not found in localStorage.");
      throw new Error('Authentication required');
    }
    const response = await fetch('http://localhost:5000/api/vendors/current', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch vendor');
    return result.data;
  })();
</script>
<section class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 bg-indigo-600 p-3 sm:p-4 md:p-5 rounded-lg">
  
  <div class="relative w-full sm:w-[300px]">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
    <input 
      type="text" 
      placeholder="Search..." 
      class="bg-slate-100 border border-slate-100 rounded-lg py-2.5 px-4 pl-10 text-sm text-slate-900 w-full placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div class="hidden sm:flex items-center gap-3 md:gap-4">
    <div class="flex items-center gap-2 md:gap-3">
      <button class="grid place-items-center w-9 h-9 md:w-10 md:h-10 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
        <Bell size={18} class="md:size-5" />
      </button>
      <button class="grid place-items-center w-9 h-9 md:w-10 md:h-10 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
        <Moon size={18} class="md:size-5" />
      </button> 
    </div>

    {#await vendorProfile then vendor}
      <div class="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer">
        <img
          src={vendor.restaurantLogo}
          alt="Restaurant Logo"
          class="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
        />
        <span class="font-medium text-white text-sm md:text-base">{vendor.restaurantName || 'Restaurant'}</span>
        <ChevronDown class="text-slate-100" size={16} />
      </div>
    {/await}
  </div>

  
  <div class="flex sm:hidden justify-between items-center">
    <div class="flex items-center gap-2">
      <button class="grid place-items-center w-9 h-9 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
        <Bell size={18} />
      </button>
      <button class="grid place-items-center w-9 h-9 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors">
        <Moon size={18} />
      </button>
    </div>

    {#await vendorProfile then vendor}
      <div class="flex items-center gap-2 cursor-pointer">
        <img
          src={vendor.restaurantLogo}
          alt="Restaurant Logo"
          class="w-9 h-9 rounded-full object-cover border border-white/30"
        />
        <ChevronDown class="text-white" size={16} />
      </div>
    {/await}
  </div>
</section> -->
<script lang="ts">
  import { API_URL } from '@/lib/config.js';
  import image2 from '@/lib/assets/profileImg.jpg'
  import { Search, Bell, Moon, ChevronDown, X } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let showSearch = false;
  let showMenu = false;
  let darkMode = false;

  const toggleSearch = () => (showSearch = !showSearch);
  const toggleMenu = () => (showMenu = !showMenu);
  const toggleTheme = () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  };

  let vendorProfile: Promise<any> = new Promise(() => {});
  onMount(() => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication token not found');

    vendorProfile = (async () => {
      const response = await fetch(`${API_URL}/api/vendors/current`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch vendor');
      return result.data;
    })();
  });
  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      darkMode = true;
      document.documentElement.classList.add('dark');
    }
  });
  let screenWidth = 0;
  onMount(() => {
    screenWidth = window.innerWidth;
    const handleResize = () => {
      screenWidth = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<section class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 mt-0 pt-0 p-3 sm:p-4 md:p-5 shadow-md">
  <!-- Search -->
  <div class="relative w-full sm:w-[300px]">
    <!-- Search Input (visible only if showSearch or large screens) -->
    {#if showSearch || screenWidth >= 640}
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search..." 
          class=" border border-slate-100 dark:border-slate-600 rounded-lg py-2.5 px-4 pl-10 text-sm text-slate-900 dark:text-slate-100 w-full placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {#if screenWidth < 640}
          <button onclick={toggleSearch} class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-300">
            <X size={18} />
          </button>
        {/if}
      </div>
    {:else}
      <button onclick={toggleSearch} class="text-white p-2 bg-indigo-500 rounded-lg hover:bg-indigo-400 transition">
        <Search size={18} />
      </button>
    {/if}
  </div>

  <!-- Desktop Actions -->
  <div class="hidden sm:flex items-center gap-3 md:gap-4">
    <button class="grid place-items-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
      <Bell size={18} class="md:size-5" />
    </button>
    <button onclick={toggleTheme} class="grid place-items-center w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
      <Moon size={18} class="md:size-5" />
    </button>

    {#await vendorProfile then vendor}
      <div class="relative">
        <button onclick={toggleMenu} class="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-600 cursor-pointer">
          <img
            src={vendor.restaurantLogo || image2}
            alt="Restaurant Logo"
            class="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
          />
          <span class="font-medium text-slate-900 dark:text-slate-100">{vendor.restaurantName || 'Restaurant'}</span>
          <ChevronDown class="text-slate-100" size={16} />
        </button>
        {#if showMenu}
          <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 shadow-lg rounded-lg p-2">
            <p class="px-3 py-2 text-sm text-slate-700 dark:text-slate-200">{vendor.restaurantEmail}</p>
            <hr class="border-slate-200 dark:border-slate-600" />
            <button class="block w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded">Settings</button>
            <button class="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-600 rounded">Logout</button>
          </div>
        {/if}
      </div>
    {/await}
  </div>

  <!-- Mobile Actions -->
  <div class="flex sm:hidden justify-between items-center">
    <div class="flex items-center gap-2">
      <button class="grid place-items-center w-9 h-9 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
        <Bell size={18} />
      </button>
      <button onclick={toggleTheme} class="grid place-items-center w-9 h-9 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
        <Moon size={18} />
      </button>
    </div>

    {#await vendorProfile then vendor}
      <div class="relative">
        <button onclick={toggleMenu} class="flex items-center gap-2 cursor-pointer">
          <img
            src={vendor.restaurantLogo}
            alt="Restaurant Logo"
            class="w-9 h-9 rounded-full object-cover border border-white/30"
          />
          <ChevronDown class="text-white dark:text-slate-200" size={16} />
        </button>

        {#if showMenu}
          <div class="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-700 shadow-lg rounded-lg p-2">
            <p class="px-3 py-2 text-sm text-slate-700 dark:text-slate-200">{vendor.restaurantName}</p>
            <hr class="border-slate-200 dark:border-slate-600" />
            <button class="block w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 rounded">Profile</button>
            <button class="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-600 rounded">Logout</button>
          </div>
        {/if}
      </div>
    {/await}
  </div>
</section>

<style>
  @media (max-width: 640px) {
    input[type="text"] {
      width: 100%;
    }
  }
</style>

