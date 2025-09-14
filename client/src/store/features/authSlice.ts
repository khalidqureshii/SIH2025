// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { UserType } from '../Types';
// import TOKENNAME from '../Token';
// import LINK from '../Link';

// export interface AuthState {
//   isLoggedIn: boolean;
//   user: UserType;
//   token: string,
//   userLoading: boolean,
// }

// const defaultUser = {
//   email: "",
//   isAdmin: false,
//   joinedOn: new Date(),
//   userId: 0,
//   username: "",
//   _id: "",
// }

// const initialState: AuthState = {
//   isLoggedIn:false,
//   user: defaultUser,
//   token: localStorage.getItem(TOKENNAME) || "",
//   userLoading: false
// }

// export const authenticateUser = createAsyncThunk(
//   "auth/authenticateUser",
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${LINK}api/auth/user`, {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }
//       const data = await response.json();
//       return data.message as UserType;
//     } catch (error:any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     storeToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       localStorage.setItem(TOKENNAME, action.payload);
//     },
//     logoutUser: (state) => {
//       state.token = "";
//       state.isLoggedIn = false;
//       state.user = defaultUser;
//       localStorage.removeItem(TOKENNAME);
//       localStorage.removeItem("reduxState");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(authenticateUser.pending, (state) => {
//         state.userLoading = true;
//       })
//       .addCase(authenticateUser.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.userLoading = false;
//         state.user = action.payload;
//       })
//       .addCase(authenticateUser.rejected, (state) => {
//         state.isLoggedIn = false;
//         state.userLoading = false;
//       });
//   },
// });

// export const { storeToken, logoutUser} = authSlice.actions;
// export default authSlice.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserType } from "../Types";
import TOKENNAME from "../Token";
import LINK from "../Link";

export interface AuthState {
  isLoggedIn: boolean;
  user: UserType;
  token: string;
  userLoading: boolean;
}

const defaultUser: UserType = {
  email: "",
  username: "",
  location: "",
  _id: "",
  joinedOn: new Date(),
};

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem(TOKENNAME),
  user: defaultUser,
  token: localStorage.getItem(TOKENNAME) || "",
  userLoading: false,
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${LINK}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 fixed
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      return data.message as UserType; // backend returns { message: userObject }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true; // 🔥 immediately mark as logged in
      localStorage.setItem(TOKENNAME, action.payload);
    },
    logoutUser: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.user = defaultUser;
      localStorage.removeItem(TOKENNAME);
      localStorage.removeItem("reduxState");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.userLoading = false;
      });
  },
});

export const { storeToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;
