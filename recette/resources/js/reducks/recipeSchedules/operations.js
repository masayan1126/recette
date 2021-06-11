import { push } from "connected-react-router";
import {
    fetchAllRecipeSchedulesAction,
    updateRecipeScheduleAction,
} from "./actions";
import { hideLoadingAction } from "../../reducks/loading/actions";

export const saveRecipeSchedule = (newRecipeSchedule, mode) => {
    console.log("newRecipeSchedule", newRecipeSchedule, mode);
    return async (dispatch, getState) => {
        axios
            .post("/api/calendar", newRecipeSchedule)
            .then((res) => {
                console.log(res.data);
                dispatch(fetchAllRecipeSchedulesAction(res.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const updateRecipeSchedule = (event) => {
    return async (dispatch, getState) => {
        axios
            .post("/api/calendar/" + event.id, event, {
                headers: {
                    "X-HTTP-Method-Override": "PUT",
                },
            })
            .then((res) => {
                dispatch(
                    updateRecipeScheduleAction(res.data[0].recipe_schedules)
                );
            })
            .catch((error) => {});
    };
};

export const deleteRecipeSchedule = (eventId) => {
    return async (dispatch, getState) => {
        axios
            .delete("/api/calendar/" + eventId)
            .then((res) => {
                dispatch(showLoadingAction());
                dispatch(
                    deleteRecipeScheduleAction(res.data[0].recipe_schedules)
                );
                console.log(res.data[0].recipe_schedules);
                setTimeout(() => {
                    dispatch(hideLoadingAction());
                }, 2000);
            })
            .catch((error) => {});
    };
};

export const fetchAllRecipeSchedule = () => {
    return async (dispatch, getState) => {
        axios
            .get("/api/calendar")
            .then((res) => {
                dispatch(
                    fetchAllRecipeSchedulesAction(res.data[0].recipe_schedules)
                );
            })
            .catch((error) => {
                console.log(error);
            });
        // const res = await axios.get("/api/calendar");
    };
};
