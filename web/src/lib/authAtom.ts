import { atom } from "jotai";

type AuthState =
	| {
			isLoggedIn: false;
			accessToken: null;
			username: null;
	  }
	| {
			isLoggedIn: true;
			accessToken: string;
			username: string;
	  };

const isLoggedInAtom = atom<boolean>(false);
const accessTokenAtom = atom<string | null>(null);
const usernameAtom = atom<string | null>(null);

// Read-only
export const authAtom = atom((get) => {
	return {
		isLoggedIn: get(isLoggedInAtom),
		accessToken: get(accessTokenAtom),
		username: get(usernameAtom),
	};
});

// Write-only
export const setAuthAtom = atom(null, (get, set, arg: AuthState) => {
	set(isLoggedInAtom, arg.isLoggedIn);
	set(accessTokenAtom, arg.accessToken);
	set(usernameAtom, arg.username);
});
