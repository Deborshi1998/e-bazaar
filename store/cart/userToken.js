import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    userToken: null,
    };

const userTokenSlice = createSlice({
    name: "userToken",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userToken = action.payload;
        },
        logout : (state) => {
            state.userToken = null;
        }
    },
    debug: true,
});
export const { login, logout } = userTokenSlice.actions;
export const selectUserToken = (state) => state.userToken;
export default userTokenSlice.reducer;
