import { create } from "zustand";
import { devtools } from "zustand/middleware";

const userStore = (set) => ({
  userInfo: null,

  setUser: (user) => {
    set(() => {
      return { ...user };
    });
  },
  clearUser: () => {
    set(() => {
      return {};
    });
  },
});

const useStore = create(devtools(userStore));

export default useStore;
