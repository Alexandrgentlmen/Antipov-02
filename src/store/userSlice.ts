import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse, UsersListResponse } from '~/api/users.types';
import usersApi from '~/services/usersApi';

const SLICE_NAME = 'users';

interface IS {
  fetchUsersListRequest: {
    isLoading: boolean;
    data: null | UsersListResponse;
    error: null | unknown;
    total_pages: null | number;
    page: null | number;
  };
  fetchUserRequest: {
    isLoading: boolean;
    data: null | UserResponse;
    error: null | unknown;
  };
}
interface FetchPageUsersListPayload {
  page: number;
}

const initialState: IS = {
  fetchUsersListRequest: {
    isLoading: false,
    data: null,
    error: null,
    total_pages: null,
    page: null,
  },
  fetchUserRequest: {
    isLoading: false,
    data: null,
    error: null,
  },
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    resetErrorUsersList: (state) => ({
      ...state,
      fetchUsersListRequest: {
        ...state.fetchUsersListRequest,
        error: null,
      },
    }),
    addUserProfile: (state, action) => ({
      ...state,
      fetchUserRequest: {
        ...state.fetchUserRequest,
        data: action.payload,
      },
    }),
    clearUser: (state) => {
      state.fetchUserRequest = {
        isLoading: false,
        data: null,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersListThunk.pending, (state) => {
        state.fetchUsersListRequest.isLoading = true;
        state.fetchUsersListRequest.error = null;
      })
      .addCase(fetchUsersListThunk.fulfilled, (state, action) => {
        state.fetchUsersListRequest.isLoading = false;
        state.fetchUsersListRequest.data = action.payload;
      })
      .addCase(fetchUsersListThunk.rejected, (state, action) => {
        state.fetchUsersListRequest.isLoading = false;
        state.fetchUsersListRequest.data = null;
        state.fetchUsersListRequest.error = action.payload || action.error;
      });
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.fetchUserRequest.isLoading = true;
        state.fetchUserRequest.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.fetchUserRequest.isLoading = false;
        state.fetchUserRequest.data = action.payload;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.fetchUserRequest.isLoading = false;
        state.fetchUserRequest.data = null;
        state.fetchUserRequest.error = action.payload || action.error;
      });
  },
});

const fetchUsersListThunk = createAsyncThunk(
  `{SLICE_NAME}/fetchUsersList`,
  async function ({ page }: FetchPageUsersListPayload, { rejectWithValue }) {
    try {
      const res = await usersApi.fetchUsersList(page);

      if (!res) {
        throw new Error('Не прошёл запрос');
      }
      let requestData = { ...res };
      const addLikePropInUsers = res.data.map((user) => ({
        ...user,
        liked: null,
      }));
      requestData = { ...requestData, data: addLikePropInUsers };
      return requestData;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  },
);

interface fetchUserThunkPayload {
  id: number;
}

const fetchUserThunk = createAsyncThunk(
  `{SLICE_NAME}/fetchUser`,
  async function ({ id }: fetchUserThunkPayload, { rejectWithValue }) {
    try {
      const res = await usersApi.fetchUser(id);
      console.log('RESPONSE', res);
      return res;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const usersSlice = {
  actions,
  reducer,
  thunks: { fetchUsersListThunk, fetchUserThunk },
} as const;
