import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import authApi, { IRegPayload } from '~/services/authApi';

const SLICE_NAME = 'auth';

interface IProfile {
  name: string | null;
  email: string | null;
  likedUsers: [];
}

interface IRegistration {
  id: number | null;
  token: null | string;
}
interface IInitialState {
  regData: IRegistration;
  user: IProfile;
  isLoading: boolean;
  error: null;
  isAuth: boolean;
}
interface FetchAuthUserPayload {
  id: number;
}

const initialState: IInitialState = {
  regData: {
    id: null,
    token: null,
  },
  user: {
    name: null,
    email: null,
    likedUsers: [],
  },
  isLoading: false,
  error: null,
  isAuth: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: `${SLICE_NAME}/profile`,
  reducers: {
    clear: () => initialState,
    setDataProfile: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        email: action.payload.email,
        name: action.payload.name,
        password: action.payload.password,
      },
    }),
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regData = action.payload;
      })
      .addCase(authUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error;
      });
  },
});
interface IAuthUserThunkPayload {
  registrationPayload: IRegPayload;
  successCallback: () => void;
}

export const authUserThunk = createAsyncThunk(
  `{SLICE_NAME}/authUser`,
  async function (
    { registrationPayload, successCallback }: IAuthUserThunkPayload,
    { rejectWithValue, dispatch },
  ) {
    try {
      const res = await authApi.registration(registrationPayload);
      const token = res.data.token;
      dispatch(
        actions.setDataProfile({
          name: registrationPayload.name,
          email: registrationPayload.email,
        }),
      );
      localStorage.setItem('token', token);
      dispatch(actions.setAuth(true));
      successCallback();
      return res.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  `${SLICE_NAME}/logoutThunk`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      localStorage.removeItem('token');
      dispatch(actions.clear());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const authSlice = {
  actions,
  reducer,
  thunks: { authUserThunk, logoutThunk },
} as const;
