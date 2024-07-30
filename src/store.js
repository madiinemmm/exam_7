import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";
import todosReducer from "./app/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/login", "user/isAuthChange"],
        ignoredPaths: ["user.user", "todos.user"],
      },
    }),
});
