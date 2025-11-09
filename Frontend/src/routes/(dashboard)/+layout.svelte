<script>
  import '@/app.css'
  let { children } = $props()
  import SideBar from '@/lib/components/ui/sideBar.svelte';
</script>

<div class="flex min-h-screen bg-slate-50">
  <SideBar />
  <main class="flex-1 p-6 md:p-8 overflow-auto">
    {@render children()}
  </main>
</div>
