import * as Actions from "./actions";
import { initialState } from "../store/initialState";

export const RecipeSchedulesReducer = (
    state = initialState.recipeSchedules,
    action
) => {
    switch (action.type) {
        case Actions.FETCH_SCHEDULES:
            return {
                ...state,
                list: action.payload,
            };
        case Actions.UPDATE_SCHEDULES:
            const arr = state.map((el) =>
                el.id === action.payload.id ? action.payload : el
            );
            return {
                arr,
                // ...state,
                // list: action.payload,
            };
        case Actions.DELETE_SCHEDULES:
            const _arr = state.filter((el) => el.id !== action.payload.id);
            return {
                _arr,
                // ...state,
                // list: action.payload,
            };
        default:
            return state;
    }
};
