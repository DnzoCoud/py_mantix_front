import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth/authSlice";
import areaReducer from "@/redux/features/areaSlice";
import locationReducer from "@/redux/features/locationSlice";
import machineReducer from "@/redux/features/machineSlice";
import eventReducer from "@/redux/features/eventSlice";

import { authService } from "./services/authService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage"; // Usa el almacenamiento local por defecto
import { areaService } from "./services/areaService";
import { locationService } from "./services/locationService";
import { userService } from "./services/userService";
import { machineService } from "./services/machineService";
import { eventService } from "./services/eventService";

//Noob storage
const createNoobStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoobStorage();
//Config
const rootReducer = combineReducers({
  auth: authReducer,
  area: areaReducer,
  location: locationReducer,
  machine: machineReducer,
  event: eventReducer,
  [authService.reducerPath]: authService.reducer,
  [areaService.reducerPath]: areaService.reducer,
  [locationService.reducerPath]: locationService.reducer,
  [userService.reducerPath]: userService.reducer,
  [machineService.reducerPath]: machineService.reducer,
  [eventService.reducerPath]: eventService.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "area", "location", "machine", "event"], // Nombre del slice que quieres persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authService.middleware)
      .concat(areaService.middleware)
      .concat(locationService.middleware)
      .concat(userService.middleware)
      .concat(machineService.middleware)
      .concat(eventService.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
