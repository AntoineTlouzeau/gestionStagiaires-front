import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import authReducer from "./accountSlice";
import appSettingsReducer from "./appSettingsSlice";

/**
 * Config to handle how the auth slice is persisted
 *
 * @author Peter Mollet
 */
const authPersistConfig = {
  key: "auth",
  storage: storage,
  //blacklist to not persist the token, isAuthenticated and username
  // blacklist: ['token', 'isAuthenticated', 'username'],
};

/**
 * Combine all the reducers. put here all the other reducers (with or without persist)
 */
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  settings: persistReducer(
    { key: "settings", storage: storage },
    appSettingsReducer
  ),
});

/**
 * Create the store
 */
export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
