import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	loading: false,
	error: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signinStart: (state) => {
			state.loading = true;
		},
		signinSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
			state.error = null;
		},
		signinFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		updateUserStart: (state) => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
			state.error = null;
		},
		updateUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deleteUserStart: (state) => {
			state.loading = true;
		},
		deleteUserSuccess: (state) => {
			state.loading = false;
			state.currentUser = null;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		signoutUserStart: (state) => {
			state.loading = true;
		},
		signoutUserSuccess: (state) => {
			state.loading = false;
			state.currentUser = null;
			state.error = null;
		},
		signoutUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	signinStart,
	signinSuccess,
	signinFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signoutUserStart,
	signoutUserSuccess,
	signoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
