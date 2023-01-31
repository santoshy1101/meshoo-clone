import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as productsReducer } from "./Product/reducer";
import { reducer as authReducer } from "./Authentication/reducer";
import { reducer as addtoCartReducer } from "./AddtoCart/reducer";
import { reducer as addSingelReducer } from "./AddSingleData/reducer";
import { reducer as orderAddressReducer} from "./OrderAddress/reducer";
const persistConfig={
  key:'persist-store',
  storage
}

let rootReducer = combineReducers({
  productsReducer,
  authReducer,
  addtoCartReducer,
  addSingelReducer,
  orderAddressReducer,
});

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

export const  persistor =persistStore(store) 
