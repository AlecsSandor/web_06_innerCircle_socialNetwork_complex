import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  password: null,
  posts: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.password = action.payload.password;
      },
      setLogout: (state) => {
        state.user = null;
        state.password = null;
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      }
    }
  })

  export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions
  export default authSlice.reducer