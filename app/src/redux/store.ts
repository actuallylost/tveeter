import { configureStore } from "@reduxjs/toolkit";
import { auth } from "@/redux";

export const store = configureStore({
	reducer: {
		auth: auth.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
