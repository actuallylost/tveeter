import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/redux";
type AuthState =
	| {
			isLoggedIn: false;
			accessToken: null;
			username: null;
	  }
	| {
			isLoggedIn: false;
			accessToken: null;
			username: string;
	  }
	| {
			isLoggedIn: true;
			accessToken: string;
			username: string;
	  };

export const auth = createSlice({
	name: "auth",
	initialState: { isLoggedIn: false, accessToken: null, username: null } as AuthState,
	reducers: {
		register: (_state, action: PayloadAction<{ username: string }>) => ({
			isLoggedIn: false,
			accessToken: null,
			username: action.payload.username,
		}),
		login: (_state, action: PayloadAction<{ accessToken: string; username: string }>) => ({
			isLoggedIn: true,
			accessToken: action.payload.accessToken,
			username: action.payload.username,
		}),
		logout: (_state) => ({ isLoggedIn: false, accessToken: null, username: null }),
	},
});

export const { register, login, logout } = auth.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUsername = (state: RootState) => state.auth.username;
