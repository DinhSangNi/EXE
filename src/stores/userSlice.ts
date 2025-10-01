import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
    role: string | null;
};

// hàm load từ localStorage
const loadUserFromStorage = (): UserState => {
    const userData = localStorage.getItem("user");
    if (userData) {
        return JSON.parse(userData);
    }

    return {
        id: null,
        name: null,
        email: null,
        avatar: null,
        role: null,
    };
};

const initialState: UserState = loadUserFromStorage();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{
                id: string;
                name: string;
                email: string;
                avatar: string;
                role: string;
                accessToken: string;
            }>
        ) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.role = action.payload.role;
            localStorage.setItem("user", JSON.stringify(state));
            localStorage.setItem("accessToken", action.payload.accessToken);
        },
        logout: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.avatar = null;
            state.role = null;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },
    },
});

export const selectIsAuthenticated = (state: { user: UserState }) =>
    Boolean(state.user.id);

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
