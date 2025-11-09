<script>
  let { orders = [], removeOrder } = $props();
</script>

<div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 border-b border-slate-200 gap-2">
    <h3 class="text-base sm:text-lg font-semibold text-slate-900">New Orders</h3>
    <span class="text-sm text-slate-600 cursor-pointer hover:text-slate-900">Filter</span>
  </div>

  <!-- Desktop & Tablet View (Table) -->
  <div class="hidden md:block overflow-x-auto">
    <table class="min-w-full border-collapse text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Order ID</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Customer</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Date</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Time</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Amount</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Payment Type</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
          <th class="px-4 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200">
        {#each orders as order (order.id)}
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-4 sm:px-6 py-4 text-slate-900 font-medium">#{order.id}</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">{order.customer}</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">{order.date}</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">{order.time}</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">${order.amount.toFixed(2)}</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">{order.paymentType}</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">Pending</td>
            <td class="px-4 sm:px-6 py-4 text-slate-700">...</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Mobile View (Cards) -->
  <div class="block md:hidden divide-y divide-slate-200">
    {#each orders as order (order.id)}
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-sm font-semibold text-slate-900">Order #{order.id}</h4>
          <span class="text-xs text-slate-600">{order.date}</span>
        </div>
        <div class="space-y-1 text-sm text-slate-700">
          <p><span class="font-medium text-slate-800">Customer:</span> {order.customer}</p>
          <p><span class="font-medium text-slate-800">Time:</span> {order.time}</p>
          <p><span class="font-medium text-slate-800">Amount:</span> ${order.amount.toFixed(2)}</p>
          <p><span class="font-medium text-slate-800">Payment:</span> {order.paymentType}</p>
          <p><span class="font-medium text-slate-800">Status:</span> <span class="text-amber-600 font-semibold">Pending</span></p>
        </div>
        <div class="mt-3 flex justify-end">
          <button class="text-sm text-primary font-medium hover:underline">View</button>
        </div>
      </div>
    {/each}
  </div>
</div>

