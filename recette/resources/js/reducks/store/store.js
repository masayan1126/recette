import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

// reducer
import { UsersReducer } from "../users/reducers";
import { RecipeSchedulesReducer } from "../recipeSchedules/reducers";
import { LoadingReducer } from "../loading/reducers";

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            loading: LoadingReducer,
            router: connectRouter(history),
            users: UsersReducer,
            recipeSchedules: RecipeSchedulesReducer,
        }),

        applyMiddleware(routerMiddleware(history), thunk)
    );
}
