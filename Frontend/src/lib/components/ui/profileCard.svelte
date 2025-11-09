<script>
  let {profileImage, restaurantName, link} = $props();
</script>

<section class="flex flex-col bg-white shadow-md items-center border border-gray-300 rounded-lg overflow-hidden">
  <div class="text-center w-full">
    <img src={profileImage} alt={`${restaurantName} logo`}  width="300" class=" h-auto object-cover" />
    <h1 class="font-bold text-2xl mt-3 px-4">{restaurantName}</h1>
    <a 
      href={link} 
      class="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-lg no-underline mt-8 mb-4"
    >
      View Menu
    </a>
  </div>
</section>
