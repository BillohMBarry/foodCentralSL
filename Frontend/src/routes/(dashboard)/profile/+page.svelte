<script lang="ts">
  import { API_URL } from '@/lib/config.js';
  import SideBarHeader from "@/lib/components/ui/sideBarHeader.svelte";
  
  let Name = {
    restaurantName: '',
    restaurantPhoneNum: '',
    restaurantLogo: '',
    restaurantAddress: '',
  }
  
  let restaurantLogo: File | null = null;
  
  async function createUserProfile(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('restaurantName', Name.restaurantName);
    formData.append('restaurantPhoneNum', Name.restaurantPhoneNum);
    formData.append('restaurantAddress', Name.restaurantAddress);
    if (restaurantLogo) formData.append('restaurantLogo', restaurantLogo);
    
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`${API_URL}/api/vendors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          restaurantName: Name.restaurantName,
          restaurantPhoneNum: Name.restaurantPhoneNum,
          restaurantLogo: Name.restaurantLogo,
          restaurantAddress: Name.restaurantAddress 
        })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Profile creation failed')
      }
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
</script>

<section class="w-full min-h-screen p-8">
  <SideBarHeader />
  <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10 mt-8">
    <div class="mb-8 text-center">
      <h4 class="text-2xl font-bold text-gray-800">Profile Setup</h4>
    </div>
    <form method="POST" class="flex flex-col gap-6" onsubmit={createUserProfile}>
      <div class="flex flex-col gap-2">
        <label for="restaurantName" class="text-sm font-semibold text-black">Restaurant Name</label>
        <input 
          type="text" 
          placeholder="chickenTown" 
          bind:value={Name.restaurantName} 
          id="restaurantName" 
          name="restaurantName" 
          autocomplete="name"
          class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="address" class="text-sm font-semibold text-black">Address</label>
        <input 
          type="text" 
          placeholder="jui road, western rural area" 
          bind:value={Name.restaurantAddress} 
          id="address" 
          name="address" 
          autocomplete="address-level1"
          class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="tel-phone" class="text-sm font-semibold text-black">Phone Number</label>
        <small class="text-xs text-black -mt-1">Enter a WhatsApp business number to get notified when someone makes an order.</small>
        <input 
          type="tel" 
          bind:value={Name.restaurantPhoneNum} 
          placeholder="+232 77 44 55 22" 
          id="tel-phone" 
          name="tel-phone" 
          autocomplete="tel-national"
          class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="businessLogo" class="text-sm font-semibold text-black">Business Logo</label>
        <input 
          type="url" 
          name="logo" 
          id="businessLogo" 
          bind:value={Name.restaurantLogo}
          class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
        >
      </div>

      <div class="relative mt-2">
        <button 
          type="submit" 
          class="w-full px-4 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 border-none rounded-lg text-white text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          Create Profile
        </button>
      </div>
    </form>
  </div>
</section>
