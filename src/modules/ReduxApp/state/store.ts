import { configureStore } from '@reduxjs/toolkit';
import { pixelsSlice } from './slice';


export const pixelsStore = configureStore({
  reducer: {
    pixels: pixelsSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof pixelsStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof pixelsStore.dispatch
