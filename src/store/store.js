import { compose, applyMiddleware, legacy_createStore as createStore} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter(Boolean);

const composedEnchancer = (
    process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnchancers = composedEnchancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnchancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)