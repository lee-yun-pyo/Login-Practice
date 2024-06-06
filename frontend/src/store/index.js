import { combineReducers, legacy_createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { commentReducer, userReducer } from "./reducer";

const userPersistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  comment: commentReducer,
});

export const store = legacy_createStore(rootReducer);
export const persistor = persistStore(store);
