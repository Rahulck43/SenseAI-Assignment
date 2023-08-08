import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import adminSlice from "../../admin/utils/adminSlice"
import userSlice from "../../user/utils/userSlice"






const rootReducer = combineReducers({
    admin:adminSlice,
    user:userSlice
})

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)



export { persistor, store }