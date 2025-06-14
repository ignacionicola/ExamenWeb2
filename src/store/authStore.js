import { create } from 'zustand';

const tokenLocal = localStorage.getItem('token');

const useAuthStore = create((set) => ({
  isAuthenticated: !!tokenLocal,
  token: tokenLocal,
  login: (token) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, token: null });
  },
}));

export default useAuthStore;