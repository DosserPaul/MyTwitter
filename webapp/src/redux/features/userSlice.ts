// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "@/redux/store.ts";
//
// export interface UserState {
//   name: string;
//   email: string;
//   token: string;
//   isLoggedIn: boolean;
// }
//
// const initialState: UserState = {
//   name: "",
//   email: "",
//   token: "",
//   isLoggedIn: false,
// };
//
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login(state, action: PayloadAction<UserState>) {
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//       state.token = action.payload.token;
//       state.isLoggedIn = true;
//     },
//
//     logout(state) {
//       state.name = "";
//       state.email = "";
//       state.token = "";
//       state.isLoggedIn = false;
//     },
//
//     update(state, action: PayloadAction<UserState>) {
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//       state.token = action.payload.token;
//     },
//
//     updateName(state, action: PayloadAction<string>) {
//       state.name = action.payload;
//     },
//     updateEmail(state, action: PayloadAction<string>) {
//       state.email = action.payload;
//     },
//     updateToken(state, action: PayloadAction<string>) {
//       state.token = action.payload;
//     },
//     updateIsLoggedIn(state, action: PayloadAction<boolean>) {
//       state.isLoggedIn = action.payload;
//     },
//   },
// });
//
// export const {
//   login,
//   logout,
//   update,
//   updateName,
//   updateEmail,
//   updateToken,
//   updateIsLoggedIn,
// } = userSlice.actions;
//
// export const selectUser = (state: RootState) => state.user;
// export default userSlice.reducer;
