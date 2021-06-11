import { createSelector } from "reselect";

const recipeSchedulesSelector = (state) => state.recipeSchedules;

export const getRecipeSchedules = createSelector(
    [recipeSchedulesSelector],
    (state) => state.list
);
