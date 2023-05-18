import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux";

type AuthState =
	| {
			isLoggedIn: false;
			accessToken: null;
	  }
	| {
			isLoggedIn: true;
			accessToken: string;
	  };

export const auth = createSlice({
	name: "auth",
	initialState: { isLoggedIn: false, accessToken: null } as AuthState,
	reducers: {
		login: (_state, action: PayloadAction<{ accessToken: string }>) => ({
			isLoggedIn: true,
			accessToken: action.payload.accessToken,
		}),
		logout: (_state) => ({ isLoggedIn: false, accessToken: null }),
	},
});

export const { login, logout } = auth.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
