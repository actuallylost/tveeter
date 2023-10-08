import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/app/redux";

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

export const message = createSlice({
	name: "message",
	initialState: {
		id: null,
		content: null,
		authorId: null,
		channelId: null,
		createdAt: null,
	} as MessageState,
	reducers: {
		send: (
			_state,
			action: PayloadAction<{
				id: bigint;
				content: string;
				authorId: bigint;
				channelId: bigint;
				createdAt: Date;
			}>,
		) => ({
			id: action.payload.id,
			content: action.payload.content,
			authorId: action.payload.authorId,
			channelId: action.payload.channelId,
			createdAt: action.payload.createdAt,
		}),
		// TODO: Fix remove reducer
		remove: (_state, action: PayloadAction<{ id: bigint }>) => ({
			id: null,
			content: null,
			authorId: null,
			channelId: null,
			createdAt: null,
		}),
	},
});

export const { send, remove } = message.actions;

export const selectId = (state: RootState) => state.message.id;
export const selectContent = (state: RootState) => state.message.content;
export const selectAuthorId = (state: RootState) => state.message.authorId;
export const selectChannelId = (state: RootState) => state.message.channelId;
export const selectCreatedAt = (state: RootState) => state.message.createdAt;
