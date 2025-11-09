<script>
  import {
    LayoutGrid,
    Package,
    BookOpen,
    QrCode,
    Settings,
    LogOut,
    Menu,
    X
  } from 'lucide-svelte';
  import {page} from '$app/state'

  let isOpen = $state(false);

  function toggleSidebar() {
    isOpen = !isOpen;
  }
</script>

<button 
  class="fixed top-4 left-4 z-[1001] md:hidden flex items-center justify-center bg-indigo-600 text-white border-none rounded-lg p-3 cursor-pointer shadow-lg transition-all hover:bg-slate-900"
  onclick={toggleSidebar} 
  aria-label="Toggle Sidebar"
>
  {#if isOpen}
    <X size={24} />
  {:else}
    <Menu size={24} />
  {/if}
</button>

<aside class="fixed -left-[280px] top-0 bottom-0 w-[280px] z-[1000] transition-[left] duration-300 flex flex-col p-6 bg-white border-r border-slate-200 md:static md:w-[280px] md:h-screen md:sticky md:top-0 {isOpen ? 'left-0 shadow-lg' : ''}">
  <div class="flex items-center gap-2 text-xl font-bold text-slate-900 mb-10 pl-2">
    <span class="leading-tight">Food<br>Central.SL</span>
  </div>

  <nav class="flex-grow">
    <ul class="list-none">
      <li>
        <a 
          href="/dashboard" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium {page.url.pathname === '/dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} transition-all" 
          aria-current={page.url.pathname === '/dashboard'}
        >
          <LayoutGrid size={20} />
          Dashboard
        </a>
      </li>
      <li>
        <a 
          href="/addMenu" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium {page.url.pathname === '/addMenu' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} transition-all" 
          aria-current={page.url.pathname === '/addMenu'}
        >
          <BookOpen size={20} />
          Add Menu
        </a>
      </li>
      <li>
        <a 
          href="/qrCodeGenerate" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium {page.url.pathname === '/qrCodeGenerate' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} transition-all" 
          aria-current={page.url.pathname === '/qrCodeGenerate'}
        >
          <QrCode size={25} />
          Generate QRCode
        </a>
      </li>
      <li>
        <a 
          href="/orders" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium {page.url.pathname === '/orders' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} transition-all" 
          aria-current={page.url.pathname === '/orders'}
        >
          <Package size={20} />
          Orders
        </a>
      </li>
      <li>
        <a 
          href="/profile" 
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium {page.url.pathname === '/profile' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'} transition-all" 
          aria-current={page.url.pathname === '/profile'}
        >
          <Settings size={20} />
          Settings
        </a>
      </li>
    </ul>
  </nav>

  <div class="pt-4 border-t border-slate-200">
    <a href="/" class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
      <LogOut size={20} />
      Log Out
    </a>
  </div>
</aside>
