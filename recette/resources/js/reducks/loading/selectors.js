import { createSelector } from "reselect";

const loadingSelector = (state) => state.loading;

export const getIsLoading = createSelector(
    [loadingSelector],
    (state) => state.isLoading
);

export const getLoadingText = createSelector(
    [loadingSelector],
    (state) => state.text
);
