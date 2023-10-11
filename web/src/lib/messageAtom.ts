import { atom } from "jotai";

import { Nullable } from "./types/Nullable";

type MessageState =
	| {
			id: null;
			content: null;
			authorId: null;
			channelId: null;
			createdAt: null;
	  }
	| {
			id: bigint;
			content: string;
			authorId: bigint;
			channelId: bigint;
			createdAt: Date;
	  };

const idAtom = atom<bigint | null>(null);
const contentAtom = atom<string | null>(null);
const authorIdAtom = atom<bigint | null>(null);
const channelIdAtom = atom<bigint | null>(null);
const createdAtAtom = atom<Date | null>(null);

// Read-only
export const messageAtom = atom<Nullable<MessageState>>((get) => {
	return {
		id: get(idAtom),
		content: get(contentAtom),
		authorId: get(authorIdAtom),
		channelId: get(channelIdAtom),
		createdAt: get(createdAtAtom),
	};
});

// Write-only
export const setMessageAtom = atom(null, (get, set, arg: MessageState) => {
	set(idAtom, arg.id);
	set(contentAtom, arg.content);
	set(authorIdAtom, arg.authorId);
	set(channelIdAtom, arg.channelId);
	set(createdAtAtom, arg.createdAt);
});
