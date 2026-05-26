import { writable, derived } from 'svelte/store';

// Inisialisasi store dengan data dari localStorage jika ada, agar persisten
const initialCart = JSON.parse(localStorage.getItem('online_store_cart')) || [];

export const cart = writable(initialCart);

// Simpan otomatis ke localStorage setiap ada perubahan pada keranjang belanja
cart.subscribe(value => {
  localStorage.setItem('online_store_cart', JSON.stringify(value));
});

// Fungsi pembantu untuk mengelola keranjang
export const addToCart = (product) => {
  cart.update(items => {
    const existingIndex = items.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      // Jika produk sudah ada, tambah kuantitasnya
      const updatedItems = [...items];
      updatedItems[existingIndex].quantity += 1;
      return updatedItems;
    } else {
      // Jika produk baru, masukkan ke keranjang dengan kuantitas 1
      return [...items, { ...product, quantity: 1 }];
    }
  });
};

export const removeFromCart = (productId) => {
  cart.update(items => items.filter(item => item.id !== productId));
};

export const updateQuantity = (productId, amount) => {
  cart.update(items => {
    return items.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Hapus jika kuantitas <= 0
  });
};

export const clearCart = () => {
  cart.set([]);
};

// Derived store untuk menghitung jumlah item unik di keranjang
export const cartCount = derived(cart, ($cart) => {
  return $cart.reduce((total, item) => total + item.quantity, 0);
});

// Derived store untuk menghitung total harga
export const cartTotal = derived(cart, ($cart) => {
  return $cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});
