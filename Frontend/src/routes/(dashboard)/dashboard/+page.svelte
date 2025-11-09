<script>
  let {restaurantName} = $props()
  import SideBarHeader from "@/lib/components/ui/sideBarHeader.svelte";
  import StateCard from "@/lib/components/ui/stateCard.svelte";
  import OrderTable from "@/lib/components/ui/orderTable.svelte";

  let orders = $state([
    {
      id: 87961,
      customer: 'Mark Allen',
      date: 'May 25, 2023',
      time: '10:30 AM',
      amount: 120,
      paymentType: 'Online',
    },
    {
      id: 87962,
      customer: 'Jane Doe',
      date: 'May 25, 2023',
      time: '10:35 AM',
      amount: 45,
      paymentType: 'Cash',
    },
    {
      id: 87963,
      customer: 'John Smith',
      date: 'May 25, 2023',
      time: '10:40 AM',
      amount: 82.5,
      paymentType: 'Online',
    },
    {
      id: 87964,
      customer: 'Sarah Lee',
      date: 'May 25, 2023',
      time: '10:42 AM',
      amount: 210,
      paymentType: 'Online',
    },
  ]);
</script>

<main class="bg-slate-50 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen">
  <SideBarHeader />

  <section class="dashboard max-w-7xl mx-auto">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <StateCard title="Total Revenue" value="$130,800" icon="revenue" />
      <StateCard title="Total Orders" value="11,000" icon="orders" />
      <StateCard title="Total Menu" value="120" icon="menu" />
    </div>

    <div class="overflow-x-auto -mx-4 sm:mx-0">
      <OrderTable {orders} removeOrder />
    </div>
  </section>
</main>
