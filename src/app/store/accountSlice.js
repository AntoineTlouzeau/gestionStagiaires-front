import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  URL_BACK_AUTHENTICATE,
  URL_BACK_REGISTER,
} from "../constants/url/urlBack";
import TokenService from "../services/tokenService";
import { mockUser } from "./mockUser";

// Had to add this line to make it work, because if using apiBackEnd instance from api.backend.js, it doesn't work.
// Because it tried to import handleHttpError which was importing the store before accounSlice was created.
const URL_API_BACK = import.meta.env.VITE_APP_API_URL_DEV;

/**
 * Async action to register the user
 *
 * @param {object} user : the user to register
 *
 * @author Peter Mollet
 */
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        `${URL_API_BACK}${URL_BACK_REGISTER}`,
        user
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

/**
 * Async action to login the user
 *
 * @param {object} user : the user to login
 *
 * @author Peter Mollet
 */
export const authenticate = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(
        `${URL_API_BACK}${URL_BACK_AUTHENTICATE}`,
        values
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

/**
 * Slice to handle the authentication. With extraReducers to handle the async actions.
 * @author Peter Mollet
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    lastname: null,
    email: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.lastname = "";
      state.email = "";
    },
    // new reducer pour faire un fake login
    loginWithFakeUser: (state) => {
      state.isAuthenticated = true;
      state.token = mockUser.token;
      state.lastname = mockUser.lastname;
      state.email = mockUser.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.lastname = "";
        state.email = "";
      })
      .addCase(register.rejected, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.lastname = "";
        state.email = "";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const token = action.payload.accessToken;
        if (token) {
          const isValid = TokenService.isTokenValid(token);
          if (isValid) {
            state.isAuthenticated = true;
            state.token = token;
            state.lastname = TokenService.getTokenSubject(token);
            state.email = TokenService.getTokenEmail(token);
            return;
          }
        }
        state.isAuthenticated = false;
        state.token = null;
        state.lastname = "";
        state.email = "";
      })
      .addCase(authenticate.rejected, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.lastname = "";
        lastname.email = "";
      });
  },
});

export default authSlice.reducer;

export const { logout, loginWithFakeUser } = authSlice.actions;