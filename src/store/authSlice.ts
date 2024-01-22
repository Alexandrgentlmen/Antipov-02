import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authApi from '~/services/authApi';

const SLICE_NAME = 'auth';

interface IProfile {
  name: string | null;
  email: string | null;
  password: string | null;
  likedUsers: [];
}
interface IRegistration {
  id: number | null;
  token: null | string;
}
interface IAuthUser {
  regData: IRegistration;
  user: IProfile;
  isLoading: boolean;
  error: null;
}
interface FetchAuthUserPayload {
  id: number;
}

const initialState: IAuthUser = {
  regData: {
    id: null,
    token: null,
  },
  user: {
    name: null,
    email: null,
    password: null,
    likedUsers: [],
  },
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  initialState,
  name: `${SLICE_NAME}/profile`,
  reducers: {
    logout: () => ({ ...initialState }),
    setDataProfile: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        email: action.payload.email,
        name: action.payload.name,
        password: action.payload.password,
      },
    }),
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

export const authUserThunk = createAsyncThunk(
  `{SLICE_NAME}/authUser`,
  async function (
    { name, email, password }: IProfile,
    { rejectWithValue, dispatch },
  ) {
    try {
      return authApi.registration(name, email, password).then((res) => {
        console.log('registration', res);
        const token = res.data.token;
        dispatch(actions.setDataProfile({ name, email, password }));
        localStorage.setItem('token', token);
        return res.data;
      });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const authSlice = {
  actions,
  reducer,
  thunks: { authUserThunk },
} as const;
