<script>
	import {page} from '$app/state'
	import { cartStore } from '$lib/stores/cartStore.svelte.js';
	import { onMount } from 'svelte';

	let ShoppingCart;

	onMount(async () => {
		const lucide = await import('lucide-svelte');
		ShoppingCart = lucide.ShoppingCart;
	});
</script>

<header class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 text-white">
	<span class="text-xl font-semibold leading-tight">Food<br>Central.SL</span>
	<nav>
		<ul class="flex items-center gap-2.5">
			<li class="inline-flex items-center mx-2.5">
				<a href="/" aria-current={page.url.pathname === '/'} class="text-xl hover:underline">Home</a>
			</li>
			<li class="inline-flex items-center mx-2.5">
				<a href="/about" aria-current={page.url.pathname === '/about'} class="text-xl hover:underline">About</a>
			</li>
			<li class="inline-flex items-center mx-2.5">
				<a href="/contact" aria-current={page.url.pathname === '/contact'} class="text-xl hover:underline">Contact</a>
			</li>
			<li class="inline-flex items-center mx-2.5">
				<a href="/login" aria-current={page.url.pathname === '/login'} class="text-xl hover:underline">Login</a>
			</li>
			<li class="inline-flex items-center mx-2.5">
				<a href="/cartCheckout" aria-current={page.url.pathname === '/cartCheckout'} class="text-xl relative">
					{#if ShoppingCart}
						<svelte:component this={ShoppingCart} size={30} />
					{/if}
					{#if cartStore.count > 0}
						<span class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
							{cartStore.count}
						</span>
					{/if}
				</a>
			</li>
		</ul>
	</nav>
</header>
