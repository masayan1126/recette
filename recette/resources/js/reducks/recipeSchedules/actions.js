export const FETCH_SCHEDULES = "FETCH_SCHEDULES";
export const fetchAllRecipeSchedulesAction = (recipeSchedules) => {
    return {
        type: "FETCH_SCHEDULES",
        payload: recipeSchedules,
    };
};

export const UPDATE_SCHEDULES = "UPDATE_SCHEDULES";
export const updateRecipeScheduleAction = (recipeSchedules) => {
    return {
        type: "UPDATE_SCHEDULES",
        payload: recipeSchedules,
    };
};

export const DELETE_SCHEDULES = "DELETE_SCHEDULES";
export const deleteRecipeScheduleAction = (recipeSchedules) => {
    return {
        type: "DELETE_SCHEDULES",
        payload: recipeSchedules,
    };
};
