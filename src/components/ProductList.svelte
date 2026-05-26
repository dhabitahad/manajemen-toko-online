<script>
  import { addToCart } from '../stores/cart.js';

  // Data produk simulasi
  const products = [
    {
      id: 1,
      name: "Quantum Sound Pro (Wireless Headphones)",
      price: 1890000,
      category: "Elektronik",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      description: "Headphone nirkabel premium dengan fitur Active Noise Cancelling dan suara resolusi tinggi."
    },
    {
      id: 2,
      name: "Aerolux Minimalist Mechanical Keyboard",
      price: 1250000,
      category: "Elektronik",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      description: "Keyboard mekanikal 75% dengan switch linear yang responsif dan lampu latar RGB dinamis."
    },
    {
      id: 3,
      name: "Vanguard Leather Messenger Bag",
      price: 850000,
      category: "Aksesoris",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      description: "Tas kulit sapi asli yang elegan dengan kompartemen laptop 15-inci terlindungi."
    },
    {
      id: 4,
      name: "Chrono Classic Sapphire Edition",
      price: 2450000,
      category: "Aksesoris",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      description: "Jam tangan analog premium dengan kaca safir tahan gores dan ketahanan air hingga 50m."
    },
    {
      id: 5,
      name: "Urban Elite Waterproof Windbreaker",
      price: 590000,
      category: "Pakaian",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      description: "Jaket windbreaker tahan air yang ringan dan nyaman untuk iklim tropis maupun dingin."
    },
    {
      id: 6,
      name: "ActiveFit Smart Fitness Tracker",
      price: 799000,
      category: "Elektronik",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
      description: "Monitor detak jantung, pola tidur, dan langkah harian dengan layar AMOLED yang cerah."
    }
  ];

  // State untuk pencarian dan kategori
  let searchQuery = "";
  let selectedCategory = "Semua";

  // Dapatkan daftar kategori unik
  const categories = ["Semua", ...new Set(products.map(p => p.category))];

  // Filter produk berdasarkan pencarian dan kategori
  $: filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };
</script>

<div class="products-section">
  <!-- Search & Filter Controls -->
  <div class="controls-panel">
    <div class="search-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input 
        type="text" 
        placeholder="Cari produk impianmu..." 
        bind:value={searchQuery}
      />
    </div>
    
    <div class="category-tabs">
      {#each categories as category}
        <button 
          class="category-tab {selectedCategory === category ? 'active' : ''}"
          on:click={() => selectedCategory = category}
        >
          {category}
        </button>
      {/each}
    </div>
  </div>

  <!-- Products Grid -->
  {#if filteredProducts.length > 0}
    <div class="products-grid">
      {#each filteredProducts as product (product.id)}
        <div class="product-card">
          <div class="image-wrapper">
            <span class="category-tag">{product.category}</span>
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>
          
          <div class="card-content">
            <div class="rating-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>{product.rating}</span>
            </div>
            
            <h3 class="product-title">{product.name}</h3>
            <p class="product-desc">{product.description}</p>
            
            <div class="card-footer">
              <span class="product-price">{formatRupiah(product.price)}</span>
              <button 
                class="btn btn-primary btn-add-cart"
                on:click={() => addToCart(product)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Tambah
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="empty-state">
      <div class="empty-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
      </div>
      <h3>Produk tidak ditemukan</h3>
      <p>Coba gunakan kata kunci pencarian lain atau pilih kategori berbeda.</p>
    </div>
  {/if}
</div>

<style>
  .products-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }

  /* Controls Styling */
  .controls-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: var(--bg-card);
    padding: 20px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  @media (min-width: 768px) {
    .controls-panel {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .search-box {
    position: relative;
    flex: 1;
    max-width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }

  .search-box input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background-color: var(--bg-app);
    color: var(--text-main);
    font-family: var(--font-primary);
    font-size: 0.95rem;
    transition: var(--transition);
  }

  .search-box input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-glow);
    background-color: var(--bg-card);
  }

  .category-tabs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none; /* Firefox */
  }

  .category-tabs::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }

  .category-tab {
    padding: 8px 16px;
    background-color: var(--bg-app);
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    white-space: nowrap;
    transition: var(--transition);
  }

  .category-tab:hover {
    color: var(--primary);
    background-color: var(--primary-light);
    border-color: var(--primary);
  }

  .category-tab.active {
    background-color: var(--primary);
    color: var(--text-inverse);
    border-color: var(--primary);
    box-shadow: 0 4px 10px var(--primary-glow);
  }

  /* Grid Styling */
  .products-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 640px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr); /* 2 Columns on desktop since cart occupies 1 column */
    }
  }

  @media (min-width: 1400px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Card Styling */
  .product-card {
    background-color: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
  }

  .product-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: hsla(var(--primary-hue), 85%, 62%, 0.3);
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 65%; /* Aspect Ratio 16:10.4 */
    background-color: #f1f5f9;
    overflow: hidden;
  }

  .image-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .product-card:hover .image-wrapper img {
    transform: scale(1.05);
  }

  .category-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 2;
    background-color: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
  }

  .rating-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: var(--accent-light);
    color: var(--accent);
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 12px;
  }

  .star-icon {
    color: var(--accent);
  }

  .product-title {
    font-size: 1.1rem;
    line-height: 1.4;
    margin-bottom: 8px;
    height: 2.8em; /* Force heights for title */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-desc {
    color: var(--text-muted);
    font-size: 0.88rem;
    line-height: 1.5;
    margin-bottom: 20px;
    height: 4.5em; /* Force heights for description */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .product-price {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--text-main);
  }

  .btn-add-cart {
    padding: 8px 16px;
    font-size: 0.88rem;
    gap: 6px;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background-color: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px dashed var(--border);
    box-shadow: var(--shadow-sm);
  }

  .empty-icon-wrapper {
    display: inline-flex;
    padding: 16px;
    background-color: var(--primary-light);
    color: var(--primary);
    border-radius: 50%;
    margin-bottom: 16px;
  }

  .empty-state h3 {
    margin-bottom: 8px;
    font-size: 1.3rem;
  }

  .empty-state p {
    color: var(--text-muted);
    max-width: 400px;
    margin: 0 auto;
  }
</style>
