import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      login:(token) => set({token}),
      logout:() => {
         set({token:null});
         localStorage.removeItem('token');
      }
    }),
    {
      name: 'token',
    }
  )
);
export default useAuthStore;