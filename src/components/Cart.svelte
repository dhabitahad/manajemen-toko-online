<script>
  import { fade, slide } from 'svelte/transition';
  import { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } from '../stores/cart.js';

  let showCheckoutSuccess = false;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handleCheckout = () => {
    if ($cart.length === 0) return;
    
    // Tampilkan sukses checkout
    showCheckoutSuccess = true;
    
    // Kosongkan keranjang belanja setelah sukses
    setTimeout(() => {
      clearCart();
      showCheckoutSuccess = false;
    }, 4000);
  };
</script>

<div class="cart-container">
  <div class="cart-header">
    <div class="title-area">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header-icon"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      <h2>Keranjang Belanja</h2>
    </div>
    
    {#if $cart.length > 0}
      <button 
        class="btn-clear" 
        on:click={clearCart}
        title="Kosongkan Keranjang"
      >
        Hapus Semua
      </button>
    {/if}
  </div>

  {#if showCheckoutSuccess}
    <div class="checkout-success" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
      <div class="success-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      </div>
      <h3>Pembayaran Berhasil!</h3>
      <p>Terima kasih telah berbelanja. Pesanan Anda sedang diproses.</p>
    </div>
  {:else if $cart.length === 0}
    <div class="cart-empty" in:fade>
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      </div>
      <p class="empty-text">Keranjang belanjamu kosong</p>
      <span class="empty-subtext">Tambahkan beberapa barang menarik dari daftar produk!</span>
    </div>
  {:else}
    <div class="cart-items-list">
      {#each $cart as item (item.id)}
        <div class="cart-item" transition:slide|local={{ duration: 250 }}>
          <img src={item.image} alt={item.name} class="item-img" />
          
          <div class="item-details">
            <h4 class="item-name">{item.name}</h4>
            <span class="item-price">{formatRupiah(item.price)}</span>
            
            <div class="item-actions">
              <div class="quantity-controls">
                <button 
                  class="qty-btn"
                  on:click={() => updateQuantity(item.id, -1)}
                  aria-label="Kurangi kuantitas"
                >
                  &minus;
                </button>
                <span class="qty-number">{item.quantity}</span>
                <button 
                  class="qty-btn"
                  on:click={() => updateQuantity(item.id, 1)}
                  aria-label="Tambah kuantitas"
                >
                  &#43;
                </button>
              </div>
              
              <button 
                class="btn-delete"
                on:click={() => removeFromCart(item.id)}
                aria-label="Hapus item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Summary Area -->
    <div class="cart-summary" transition:slide>
      <div class="summary-row">
        <span>Kuantitas Barang</span>
        <span class="val-bold">{$cartCount} item</span>
      </div>
      <div class="summary-row">
        <span>Pengiriman</span>
        <span class="val-free text-success">Gratis</span>
      </div>
      
      <div class="summary-total">
        <span>Total Pembayaran</span>
        <span class="total-price">{formatRupiah($cartTotal)}</span>
      </div>
      
      <button 
        class="btn btn-primary btn-checkout"
        on:click={handleCheckout}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
        Bayar Sekarang
      </button>
    </div>
  {/if}
</div>

<style>
  .cart-container {
    background-color: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    padding: 24px;
    box-shadow: var(--shadow-md);
    position: sticky;
    top: 100px;
    max-height: calc(100vh - 140px);
    display: flex;
    flex-direction: column;
  }

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 20px;
  }

  .title-area {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .title-area h2 {
    font-size: 1.25rem;
  }

  .header-icon {
    color: var(--primary);
  }

  .btn-clear {
    background: none;
    border: none;
    color: var(--danger);
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    transition: var(--transition);
  }

  .btn-clear:hover {
    background-color: var(--danger-light);
  }

  /* Items list */
  .cart-items-list {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 4px;
    margin-bottom: 20px;
  }

  .cart-item {
    display: flex;
    gap: 16px;
    padding: 12px;
    background-color: var(--bg-app);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
  }

  .item-img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    background-color: #f1f5f9;
  }

  .item-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-name {
    font-size: 0.92rem;
    line-height: 1.3;
    color: var(--text-main);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-price {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .item-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    background-color: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 2px;
  }

  .qty-btn {
    width: 26px;
    height: 26px;
    background: none;
    border: none;
    color: var(--text-main);
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: var(--transition);
  }

  .qty-btn:hover {
    background-color: var(--primary-light);
    color: var(--primary);
  }

  .qty-number {
    font-size: 0.88rem;
    font-weight: 700;
    min-width: 24px;
    text-align: center;
  }

  .btn-delete {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
  }

  .btn-delete:hover {
    color: var(--danger);
    background-color: var(--danger-light);
  }

  /* Summary Styling */
  .cart-summary {
    border-top: 1px solid var(--border);
    padding-top: 16px;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .val-bold {
    font-weight: 600;
    color: var(--text-main);
  }

  .text-success {
    color: var(--accent) !important;
    font-weight: 700;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-top: 1px dashed var(--border);
    border-bottom: 1px dashed var(--border);
    margin: 6px 0;
  }

  .summary-total span {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .total-price {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--primary);
  }

  .btn-checkout {
    width: 100%;
    padding: 12px;
  }

  /* Empty State */
  .cart-empty {
    text-align: center;
    padding: 40px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }

  .empty-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--bg-app);
    color: var(--text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .empty-text {
    font-weight: 600;
    color: var(--text-main);
    font-size: 1.05rem;
    margin-bottom: 4px;
  }

  .empty-subtext {
    font-size: 0.8rem;
    color: var(--text-muted);
    max-width: 220px;
    line-height: 1.4;
  }

  /* Success State */
  .checkout-success {
    text-align: center;
    padding: 40px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }

  .success-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--accent-light);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .checkout-success h3 {
    color: var(--text-main);
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  .checkout-success p {
    color: var(--text-muted);
    font-size: 0.88rem;
    line-height: 1.4;
    max-width: 240px;
  }
</style>
