<script>
  let { title, value, icon } = $props();
</script>

<div class="bg-white border border-slate-200 rounded-lg p-6 flex items-center gap-4 shadow-sm">
  <div class="grid place-items-center p-3 rounded-lg bg-indigo-50 text-indigo-600">
    <!-- Icon placeholder -->
  </div>
  <div>
    <h3 class="text-sm font-medium text-slate-600 mb-1">{title}</h3>
    <p class="text-2xl font-bold text-slate-900">{value}</p>
  </div>
</div>
