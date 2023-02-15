import create from 'zustand';

const useOwnerStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  users: [],
}));

export default useOwnerStore;