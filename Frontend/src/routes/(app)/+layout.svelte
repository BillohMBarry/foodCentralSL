<script>
	import '@/app.css';
	import HeaderSection from '@/lib/components/ui/headerSection.svelte';
	let { children } = $props();
</script>


<HeaderSection />

{@render children()}
