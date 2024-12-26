import createAuthSlice from "@/features/auth/authSlice";
import { Store } from "@/types/store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create<Store>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
  })),
);

export default useStore;
