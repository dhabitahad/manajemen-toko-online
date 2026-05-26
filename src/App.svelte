<script>
  import ProductList from './components/ProductList.svelte';
  import Cart from './components/Cart.svelte';
  import { cartCount } from './stores/cart.js';

  // Toggle keranjang belanja untuk tampilan mobile
  let showMobileCart = false;

  const toggleMobileCart = () => {
    showMobileCart = !showMobileCart;
  };
</script>

<header class="app-header">
  <div class="container header-container">
    <div class="logo-group">
      <div class="logo-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
      </div>
      <span class="logo-text">Aqila<span>Mart</span></span>
    </div>

    <!-- Info Developer PKL -->
    <div class="developer-tag">
      <span class="pulse-dot"></span>
      Projek PKL: Manajemen Toko
    </div>

    <div class="header-actions">
      <!-- Tombol keranjang belanja khusus mobile -->
      <button class="cart-badge-btn" on:click={toggleMobileCart} aria-label="Keranjang Belanja">
        <div class="badge-icon-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          {#if $cartCount > 0}
            <span class="badge-count">{$cartCount}</span>
          {/if}
        </div>
      </button>
    </div>
  </div>
</header>

<main class="container app-body">
  <!-- Kolom Kiri: Daftar Produk -->
  <section class="products-column">
    <div class="section-title-wrapper">
      <h2>Daftar Produk Unggulan</h2>
      <p>Pilih produk terbaik dengan harga bersahabat dan kualitas premium</p>
    </div>
    <ProductList />
  </section>

  <!-- Kolom Kanan: Keranjang (Tampil di kanan pada desktop, modal/overlay pada mobile jika di-toggle) -->
  <section class="cart-column {showMobileCart ? 'show-mobile' : ''}">
    {#if showMobileCart}
      <!-- Backdrop khusus mobile -->
      <button class="cart-backdrop" on:click={toggleMobileCart} aria-label="Tutup Keranjang"></button>
    {/if}
    
    <div class="cart-wrapper">
      {#if showMobileCart}
        <button class="btn-close-mobile" on:click={toggleMobileCart} aria-label="Tutup">
          &times;
        </button>
      {/if}
      <Cart />
    </div>
  </section>
</main>

<footer class="app-footer">
  <div class="container footer-content">
    <p>&copy; 2026 AqilaMart. Dikembangkan untuk Laporan PKL Rekayasa Perangkat Lunak.</p>
    <div class="footer-links">
      <span>Status: Reaktif (Svelte Store)</span>
      <span class="divider">|</span>
      <span>Build: Vite + Svelte</span>
    </div>
  </div>
</footer>

<style>
  /* Header Styling */
  .app-header {
    background-color: var(--bg-header);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: var(--transition);
  }

  .header-container {
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-icon {
    background-color: var(--primary);
    color: var(--text-inverse);
    width: 38px;
    height: 38px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px var(--primary-glow);
  }

  .logo-text {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--text-main);
  }

  .logo-text span {
    color: var(--primary);
  }

  .developer-tag {
    display: none;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    background-color: var(--bg-app);
    padding: 6px 12px;
    border-radius: 30px;
    border: 1px solid var(--border);
  }

  @media (min-width: 768px) {
    .developer-tag {
      display: flex;
    }
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    background-color: var(--accent);
    border-radius: 50%;
    position: relative;
  }

  .pulse-dot::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--accent);
    animation: pulse 1.8s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }

  .cart-badge-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: var(--radius-sm);
    color: var(--text-main);
    transition: var(--transition);
  }

  .cart-badge-btn:hover {
    background-color: var(--primary-light);
    color: var(--primary);
  }

  .badge-icon-wrapper {
    position: relative;
    display: inline-flex;
    padding: 4px;
  }

  .badge-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--primary);
    color: var(--text-inverse);
    font-size: 0.72rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--bg-card);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  /* Body Layout */
  .app-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    padding-top: 32px;
    padding-bottom: 60px;
    min-height: calc(100vh - 172px);
  }

  @media (min-width: 1024px) {
    .app-body {
      grid-template-columns: 2fr 1fr; /* 2 Columns on desktop */
    }
  }

  @media (min-width: 1200px) {
    .app-body {
      grid-template-columns: 2.3fr 1fr;
    }
  }

  .section-title-wrapper {
    margin-bottom: 24px;
  }

  .section-title-wrapper h2 {
    font-size: 1.6rem;
    margin-bottom: 6px;
  }

  .section-title-wrapper p {
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  /* Cart Column Mobile vs Desktop */
  .cart-column {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100%;
    z-index: 200;
    transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
  }

  .cart-column.show-mobile {
    right: 0;
  }

  .cart-backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    border: none;
    cursor: pointer;
  }

  .cart-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 85%;
    max-width: 400px;
    height: 100%;
    background-color: var(--bg-card);
    box-shadow: -10px 0 30px rgba(0,0,0,0.15);
    padding: 20px;
    display: flex;
    flex-direction: column;
    z-index: 201;
  }

  /* Override component stickiness in mobile slide-out */
  :global(.cart-wrapper .cart-container) {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    height: 100% !important;
    max-height: 100% !important;
    position: static !important;
  }

  .btn-close-mobile {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--text-muted);
    cursor: pointer;
    line-height: 1;
    margin-bottom: 10px;
    transition: var(--transition);
  }

  .btn-close-mobile:hover {
    color: var(--danger);
  }

  @media (min-width: 1024px) {
    .cart-column {
      position: static;
      width: auto;
      height: auto;
      z-index: auto;
      transition: none;
      display: block;
    }

    .cart-backdrop {
      display: none;
    }

    .cart-wrapper {
      position: static;
      width: auto;
      height: auto;
      box-shadow: none;
      padding: 0;
      background: none;
    }
  }

  /* Footer Styling */
  .app-footer {
    background-color: var(--bg-card);
    border-top: 1px solid var(--border);
    padding: 24px 0;
    margin-top: auto;
    transition: var(--transition);
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  .footer-links {
    display: flex;
    gap: 12px;
    font-weight: 600;
  }

  .divider {
    color: var(--border);
  }
</style>
