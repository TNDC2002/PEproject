import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';
const initialState = {
    mode: "dark",
    user: null,
    token: null,
    movies: [],
};
const deleteCookie = async () => {
    const requestData = {
    };
    const addFavouriteResponse = await fetch(
        "http://localhost:5000/auth/logout",
        {
            method: "GET",
            credentials: 'include'
        }
    );
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },

        setLogin: (state, action) => {
            state.user = action.payload.user;
        },

        setLogout: (state) => {
            state.user = null;
            deleteCookie('token');
            const history = useHistory();
            history.push("/");
        },

        updateUser: (state, action) => {
            state.user = action.payload.user;
        }
    }
})

export const { setMode, setLogin, setLogout, updateUser } = authSlice.actions;
export default authSlice.reducer;