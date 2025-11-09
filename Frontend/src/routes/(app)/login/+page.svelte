<script lang="ts">
  import { API_URL } from '@/lib/config.js';
  import { page } from '$app/state'
  import { goto } from '$app/navigation'
  import { Eye,EyeOff } from 'lucide-svelte'

  let showPassword = $state(false);
  let showConfirmPassword = $state(false);
  let passwordTouched = $state(false);
  let email = $state('')
  let password = $state('')

  let isLoading = $state(false)
  let errorMessage = $state('')

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault()
    isLoading = true
    errorMessage = ''

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email , password: password
        })
      })
      const data = await response.json()
      if(!response.ok) {
        throw new Error(data.message || 'Login failed')
      }
      if (data.data?.idToken) {
        localStorage.setItem('authToken', data.data.idToken)
      }
      await goto('/dashboard')
    } catch(error: unknown) {
      errorMessage = error instanceof Error ? error.message : 'Login failed'
    } finally {
      isLoading = false
    }
  }
</script>

<section class="w-full min-h-screen p-8">
  <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10">
    <h4 class="text-2xl font-bold text-gray-800 mb-8 text-center">Login Form</h4>
    <div class="flex flex-col gap-6">
      <form method="POST" action="/api/login" class="flex flex-col gap-6" onsubmit={handleLogin}>
        <div class="flex flex-col gap-2">
          <input 
            type="email" 
            placeholder="kadiKitchen@gmail.com" 
            autocomplete="email" 
            id="email" 
            bind:value={email} 
            required
            class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
          >
        </div>
        <div class="flex flex-col gap-2 relative">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            autocomplete="current-password" 
            id="password" 
            bind:value={password} 
            onblur={() => passwordTouched = true} 
            required
            class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
          >
          <button 
            type="button" 
            onclick={() => showPassword = !showPassword} 
            class="absolute right-2.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
          >
            {#if showPassword}
              <EyeOff />
            {:else}
              <Eye />
            {/if}
          </button>
        </div>
        <div class="text-sm">
          <a href="/" class="text-blue-600 hover:underline">Forgot password?</a>
        </div>
        {#if errorMessage}
          <p class="text-red-600 text-sm">{errorMessage}</p>
        {/if}
        
        <div class="relative mt-2">
          <button 
            class="w-full px-4 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 border-none rounded-lg text-white text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed relative z-10" 
            aria-current={page.url.pathname === '/dashboard'} 
            aria-label="Go to dashboard" 
            type="submit" 
            disabled={isLoading}
          >
            {#if isLoading}
              Logging in...
            {:else}
              Login
            {/if}
          </button>
        </div>
        <div class="text-center text-sm">
          Not a member? 
          <a href="/signup" aria-current={page.url.pathname === '/signup'} class="text-blue-600 hover:underline ml-1">Signup now</a>
        </div>
      </form>
    </div>
  </div>
</section>
