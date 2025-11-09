<script lang="ts">
  import { Search } from "lucide-svelte";
  
  let { orders = [], onAccept } = $props();
  
  function formatItems(items: string[] | undefined): string {
    if (!items || !Array.isArray(items)) return 'N/A';
    return items.join(', ');
  }
</script>

<main class="main-content">
  <div class="content-header">
    <h1>Order Management</h1>
    <p>Track and manage orders in real-time</p>
  </div>

  <div class="search-bar">
    <Search class="icon" size={20} />
    <input type="text" placeholder="Search orders by order number or table number" />
  </div>

    <div class="page-wrapper">
        <table class="order-table">
        <thead>
            <tr>
            <th>Order Number</th>
            <th>Table Number</th>
            <th>Items Ordered</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each orders as order (order.id)}
            <tr>
                <td class="order-number">#{order.id}</td>
                <td>{order.table}</td>
                <td class="items-ordered">{formatItems(order.items)}</td>
                <td>{order.quantity}</td>
                <td>${order.price.toFixed(2)}</td>
                <td class="actions">
                <button 
                    type="button" 
                    class="btn-accept"
                    onclick={() => onAccept?.(order.id)}
                >
                    Accept Order
                </button>
                </td>
            </tr>
            {/each}
        </tbody>
        </table>
    </div>
</main>
