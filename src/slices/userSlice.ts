import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types/user';

export interface UserSliceState {
  user: User | null | false;
}

const initialState: UserSliceState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | false>) => {
      state.user = action.payload;
    },
  },
});

// Exporting the `setUser` action creator from the slice.
// This allows you to dispatch this action from components or other parts of the application.
export const { setUser } = userSlice.actions;

// Exporting the reducer function of the user slice as the default export of this module.
// This reducer will be used to handle state changes related to user information in the Redux store.
export default userSlice.reducer;
