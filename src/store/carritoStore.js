import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  aggregarCarrito: (product) =>
    set((state) => {
      const updatedCart = [...state.cart, product];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  eliminarCarrito: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((item, index) => index !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  limpiarCarrito: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },
}));
