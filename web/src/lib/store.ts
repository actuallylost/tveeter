import { createStore } from "jotai";

import { setAuthAtom, setMessageAtom } from "@/lib";

const authStore = createStore();
authStore.set(setAuthAtom, { isLoggedIn: false, accessToken: null, username: null });

const messageStore = createStore();
messageStore.set(setMessageAtom, {
	id: null,
	content: null,
	authorId: null,
	channelId: null,
	createdAt: null,
});
