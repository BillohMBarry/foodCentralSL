<script lang="ts">
  import { API_URL } from '@/lib/config.js';
  import { goto } from '$app/navigation';
  import {Eye, EyeOff} from 'lucide-svelte';

  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let isLoading = $state(false);
  let showPassword = $state(false);
  let showConfirmPassword = $state(false);
  
  let emailTouched = $state(false);
  let passwordTouched = $state(false);
  let confirmPasswordTouched = $state(false);
  
  let serverErrorMessage = $state('');
  let successMessage = $state('');

  let emailError = $derived(() => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email';
    }
    return '';
  });

  let passwordError = $derived(() => {
    if (!password) return 'Password is required';
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain a lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain an uppercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain a number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain a special character (!@#$%^&*)';
    }
    return '';
  });

  let confirmPasswordError = $derived(() => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  });

  let isFormValid = $derived(() => {
    const hasStartedTyping = email.length > 0 || password.length > 0;
    return hasStartedTyping && !emailError && !passwordError && !confirmPasswordError;
  });

  async function handleSignup(event: SubmitEvent) {
    event.preventDefault();
    isLoading = true;
    serverErrorMessage = '';
    successMessage = '';

    try {
      if (!isFormValid) {
        throw new Error('Please fix the errors in the form.');
      }

      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          serverErrorMessage = data.errors.map((err: any): any => err.msg).join(' ');
        } else {
          serverErrorMessage = data.message || 'Signup failed.';
        }
        return;
      }

      if (data.success) {
        successMessage = 'Account created! You can now log in.';
        email = '';
        password = '';
        setTimeout(() => goto('/login'), 2000);
      }

    } catch (error: unknown) {
      serverErrorMessage = error instanceof Error ? error.message : 'Signup failed.';
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="w-full min-h-screen p-8">
  <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-10">
    <h4 class="text-2xl font-bold text-gray-800 mb-8 text-center">Signup Form</h4>
    <div class="flex flex-col gap-6">
      <form action="/api/signup" method="POST" class="flex flex-col gap-6" onsubmit={handleSignup}>
        <div class="flex flex-col gap-2">
          <input 
            type="email" 
            placeholder="kadiKitchen@gmail.com" 
            autocomplete="email" 
            id="email" 
            bind:value={email} 
            onblur={() => emailTouched = true} 
            required
            class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
          >
        </div>
        
        <div class="flex flex-col gap-2 relative">
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Password" 
            id="password" 
            bind:value={password} 
            onblur={() => passwordTouched = true} 
            autocomplete="new-password" 
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

        <div class="flex flex-col gap-2 relative">
          <input 
            type={showConfirmPassword ? 'text' : 'password'} 
            placeholder="Confirm Password" 
            id="confirmPassword" 
            bind:value={confirmPassword} 
            onblur={() => confirmPasswordTouched = true} 
            autocomplete="new-password" 
            required
            class="w-full px-4 py-3.5 border-2 border-black rounded-lg text-base transition-all focus:outline-none focus:border-black focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]"
          >
          <button 
            type="button" 
            onclick={() => showConfirmPassword = !showConfirmPassword} 
            class="absolute right-2.5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer"
          >
            {#if showConfirmPassword}
              <EyeOff />
            {:else}
              <Eye />
            {/if}
          </button>
        </div>

        <div class="relative mt-2">
          <button 
            type="submit" 
            class="w-full px-4 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 border-none rounded-lg text-white text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed relative z-10" 
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Creating account...' : 'Signup'}
          </button>
        </div>
        
        <div class="text-center text-sm">
          <p>Already have an account <a href="/login" class="text-blue-600 hover:underline ml-1">login</a></p>
        </div>
      </form>
    </div>
  </div>
</section>
