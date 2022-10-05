import { compose, applyMiddleware, legacy_createStore as createStore} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleWares = [logger];

const composedEnchancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnchancers);