import { create } from 'zustand';

const tokenLocal = localStorage.getItem('token'); //verifica el token

const useAuthStore = create((set) => ({
  isAuthenticated: !!tokenLocal,
  token: tokenLocal,
  login: (token) => {
    // console.log('Login - Guardando token:', token);
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, token });
    // console.log('Login - Estado actualizado, isAuthenticated: true');
  },
  logout: () => {
    // console.log('Logout - Limpiando token');
    localStorage.removeItem('token');
    set({ isAuthenticated: false, token: null });
    // console.log('Logout - Estado actualizado, isAuthenticated: false');
  },
}));

export default useAuthStore;